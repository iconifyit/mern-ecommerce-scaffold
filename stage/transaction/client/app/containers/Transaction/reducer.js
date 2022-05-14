/*
 *
 * Transaction reducer
 *
 */

import {
    FETCH_TRANSACTIONS,
    FETCH_TRANSACTIONS_SELECT,
    FETCH_STORE_TRANSACTIONS,
    FETCH_TRANSACTION,
    TRANSACTION_CHANGE,
    TRANSACTION_EDIT_CHANGE,
    SET_TRANSACTION_FORM_ERRORS,
    SET_TRANSACTION_FORM_EDIT_ERRORS,
    ADD_TRANSACTION,
    REMOVE_TRANSACTION,
    SET_TRANSACTIONS_LOADING,
    RESET_TRANSACTION
} from './constants';

const initialState = {
    transactions: [],
    transactionsSelect: [],
    storeTransactions: [],
    transaction: {
        _id: ''
    },
    transactionFormData: {
        name: '',
        tags: '',
        isActive: true
    },
    formErrors: {},
    editFormErrors: {},
    isLoading: false
};

const transactionReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TRANSACTIONS:
            return {
                ...state,
                transactions: action.payload
            };
        case FETCH_STORE_TRANSACTIONS:
            return {
                ...state,
                storeTransactions: action.payload
            };
        case FETCH_TRANSACTIONS_SELECT:
            return {
                ...state,
                transactionsSelect: action.payload
            };
        case FETCH_TRANSACTION:
            return {
                ...state,
                transaction: action.payload
            };
        case ADD_TRANSACTION:
            return {
                ...state,
                transactions: [...state.transactions, action.payload]
            };
        case REMOVE_TRANSACTION:
            const index = state.transactions.findIndex(b => b._id === action.payload);
            return {
                ...state,
                transactions: [
                    ...state.transactions.slice(0, index),
                    ...state.transactions.slice(index + 1)
                ]
            };
        case TRANSACTION_CHANGE:
            return {
                ...state,
                transactionFormData: {
                    ...state.transactionFormData,
                    ...action.payload
                }
            };
        case TRANSACTION_EDIT_CHANGE:
            return {
                ...state,
                transaction: {
                    ...state.transaction,
                    ...action.payload
                }
            };
        case SET_TRANSACTION_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case SET_TRANSACTION_FORM_EDIT_ERRORS:
            return {
                ...state,
                editFormErrors: action.payload
            };
        case SET_TRANSACTIONS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case RESET_TRANSACTION:
            return {
                ...state,
                transactionFormData: initialState.transactionFormData,
                transaction: initialState.transaction,
                formErrors: initialState.formErrors,
                editFormErrors: initialState.editFormErrors
            };
        default:
            return state;
    }
};

export default transactionReducer;