/*
 *
 * Credit actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
    FETCH_CREDITS,
    FETCH_STORE_CREDITS,
    FETCH_CREDIT,
    CREDIT_CHANGE,
    CREDIT_EDIT_CHANGE,
    FETCH_CREDITS_SELECT,
    SET_CREDIT_FORM_ERRORS,
    SET_CREDIT_FORM_EDIT_ERRORS,
    ADD_CREDIT,
    REMOVE_CREDIT,
    SET_CREDITS_LOADING,
    RESET_CREDIT
} from './constants';

import handleError from '../../utils/error';
import {
    formatSelectOptions,
    unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const creditChange = (name, value) => {
    let formData = {};
    formData[name] = value;

    return {
        type: CREDIT_CHANGE,
        payload: formData
    };
};

export const creditEditChange = (name, value) => {
    let formData = {};
    formData[name] = value;

    return {
        type: CREDIT_EDIT_CHANGE,
        payload: formData
    };
};

export const creditSelect = value => {
    return {
        type: CREDIT_SELECT,
        payload: value
    };
};

export const resetCredit = () => {
    return async (dispatch, getState) => {
        dispatch({ type: RESET_CREDIT });
    };
};

// fetch store credits api
export const fetchStoreCredits = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`/api/credit/list`);

            dispatch({
                type: FETCH_STORE_CREDITS,
                payload: response.data.credits
            });
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// fetch credits api
export const fetchCredits = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: SET_CREDITS_LOADING, payload: true });
            const response = await axios.get(`/api/credit`);

            dispatch({
                type: FETCH_CREDITS,
                payload: response.data.credits
            });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch({ type: SET_CREDITS_LOADING, payload: false });
        }
    };
};

// fetch credit api
export const fetchCredit = id => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`/api/credit/${id}`);
            dispatch({
                type: FETCH_CREDIT,
                payload: response.data.credit
            });
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// add credit api
export const addCredit = () => {
    return async (dispatch, getState) => {
        try {
            const rules = {
                name: 'required' 
            };

            const credit = getState().credit.creditFormData;

            const newCredit = {
                name: credit.name 
            };

            const { isValid, errors } = allFieldsValidation(newCredit, rules, {
                'required.name': 'Name is required.'
            });

            if (!isValid) {
                return dispatch({ type: SET_CREDIT_FORM_ERRORS, payload: errors });
            }

            const response = await axios.post(`/api/credit/add`, newCredit);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                dispatch(success(successfulOptions));
                dispatch({
                    type: ADD_CREDIT,
                    payload: response.data.credit
                });
                dispatch(resetCredit());
                dispatch(goBack());
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// update credit api
export const updateCredit = () => {
    return async (dispatch, getState) => {
        try {
            const rules = {
                name: 'required' 
            };

            const credit = getState().credit.credit;

            const newCredit = {
                name: credit.name 
            };

            const { isValid, errors } = allFieldsValidation(newCredit, rules, {
                'required.name': 'Name is required.' 
            });

            if (! isValid) {
                return dispatch({
                    type: SET_CREDIT_FORM_EDIT_ERRORS,
                    payload: errors
                });
            }

            const id = credit._id;
            const response = await axios.put(`/api/credit/${id}`, {
                credit: newCredit
            });

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                dispatch(success(successfulOptions));
                dispatch(resetCredit());
                dispatch(goBack());
            }
        } 
        catch (error) {
            handleError(error, dispatch);
        }
    };
};

// activate credit api
export const activateCredit = (id, value) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.put(`/api/credit/${id}/active`, {
                credit: {
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

// delete credit api
export const deleteCredit = id => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.delete(`/api/credit/delete/${id}`);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success == true) {
                dispatch(success(successfulOptions));
                dispatch({
                    type: REMOVE_CREDIT,
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


export const fetchCreditsSelect = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`/api/credit/list/select`);

            console.log('Credits', response)
            console.log(
                'formatSelectOptions(response.data.credits, true)', 
                formatSelectOptions(response.data.credits, true)
            )

            dispatch({
                type: FETCH_CREDITS_SELECT,
                payload: formatSelectOptions(response.data.credits, false)
            });
        } 
        catch (error) {
            handleError(error, dispatch);
        }
    };
};