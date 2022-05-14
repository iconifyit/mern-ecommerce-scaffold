/*
 *
 * Transaction actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
    FETCH_TRANSACTIONS,
    FETCH_STORE_TRANSACTIONS,
    FETCH_TRANSACTION,
    TRANSACTION_CHANGE,
    TRANSACTION_EDIT_CHANGE,
    FETCH_TRANSACTIONS_SELECT,
    SET_TRANSACTION_FORM_ERRORS,
    SET_TRANSACTION_FORM_EDIT_ERRORS,
    ADD_TRANSACTION,
    REMOVE_TRANSACTION,
    SET_TRANSACTIONS_LOADING,
    RESET_TRANSACTION
} from './constants';

import handleError from '../../utils/error';
import {
    formatSelectOptions,
    unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const transactionChange = (name, value) => {
    let formData = {};
    formData[name] = value;

    return {
        type: TRANSACTION_CHANGE,
        payload: formData
    };
};

export const transactionEditChange = (name, value) => {
    let formData = {};
    formData[name] = value;

    return {
        type: TRANSACTION_EDIT_CHANGE,
        payload: formData
    };
};

export const transactionSelect = value => {
    return {
        type: TRANSACTION_SELECT,
        payload: value
    };
};

export const resetTransaction = () => {
    return async (dispatch, getState) => {
        dispatch({ type: RESET_TRANSACTION });
    };
};

// fetch store transactions api
export const fetchStoreTransactions = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`/api/transaction/list`);

            dispatch({
                type: FETCH_STORE_TRANSACTIONS,
                payload: response.data.transactions
            });
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// fetch transactions api
export const fetchTransactions = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: SET_TRANSACTIONS_LOADING, payload: true });
            const response = await axios.get(`/api/transaction`);

            dispatch({
                type: FETCH_TRANSACTIONS,
                payload: response.data.transactions
            });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch({ type: SET_TRANSACTIONS_LOADING, payload: false });
        }
    };
};

// fetch transaction api
export const fetchTransaction = id => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`/api/transaction/${id}`);
            dispatch({
                type: FETCH_TRANSACTION,
                payload: response.data.transaction
            });
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// add transaction api
export const addTransaction = () => {
    return async (dispatch, getState) => {
        try {
            const rules = {
                name: 'required' 
            };

            const transaction = getState().transaction.transactionFormData;

            const newTransaction = {
                name: transaction.name 
            };

            const { isValid, errors } = allFieldsValidation(newTransaction, rules, {
                'required.name': 'Name is required.'
            });

            if (!isValid) {
                return dispatch({ type: SET_TRANSACTION_FORM_ERRORS, payload: errors });
            }

            const response = await axios.post(`/api/transaction/add`, newTransaction);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                dispatch(success(successfulOptions));
                dispatch({
                    type: ADD_TRANSACTION,
                    payload: response.data.transaction
                });
                dispatch(resetTransaction());
                dispatch(goBack());
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// update transaction api
export const updateTransaction = () => {
    return async (dispatch, getState) => {
        try {
            const rules = {
                name: 'required' 
            };

            const transaction = getState().transaction.transaction;

            const newTransaction = {
                name: transaction.name 
            };

            const { isValid, errors } = allFieldsValidation(newTransaction, rules, {
                'required.name': 'Name is required.' 
            });

            if (! isValid) {
                return dispatch({
                    type: SET_TRANSACTION_FORM_EDIT_ERRORS,
                    payload: errors
                });
            }

            const id = transaction._id;
            const response = await axios.put(`/api/transaction/${id}`, {
                transaction: newTransaction
            });

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                dispatch(success(successfulOptions));
                dispatch(resetTransaction());
                dispatch(goBack());
            }
        } 
        catch (error) {
            handleError(error, dispatch);
        }
    };
};

// activate transaction api
export const activateTransaction = (id, value) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.put(`/api/transaction/${id}/active`, {
                transaction: {
                    isActive: value
                }
            });

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                dispatch(success(successfulOptions));
            }
        } 
        catch (error) {
            handleError(error, dispatch);
        }
    };
};

// delete transaction api
export const deleteTransaction = id => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.delete(`/api/transaction/delete/${id}`);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success == true) {
                dispatch(success(successfulOptions));
                dispatch({
                    type: REMOVE_TRANSACTION,
                    payload: id
                });
                dispatch(goBack());
            }
        } 
        catch (error) {
            handleError(error, dispatch);
        }
    };
};


export const fetchTransactionsSelect = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`/api/transaction/list/select`);

            console.log('Transactions', response)
            console.log(
                'formatSelectOptions(response.data.transactions, true)', 
                formatSelectOptions(response.data.transactions, true)
            )

            dispatch({
                type: FETCH_TRANSACTIONS_SELECT,
                payload: formatSelectOptions(response.data.transactions, false)
            });
        } 
        catch (error) {
            handleError(error, dispatch);
        }
    };
};