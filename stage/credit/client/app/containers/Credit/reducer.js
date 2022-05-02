/*
 *
 * Credit reducer
 *
 */

import {
    FETCH_CREDITS,
    FETCH_CREDITS_SELECT,
    FETCH_STORE_CREDITS,
    FETCH_CREDIT,
    CREDIT_CHANGE,
    CREDIT_EDIT_CHANGE,
    SET_CREDIT_FORM_ERRORS,
    SET_CREDIT_FORM_EDIT_ERRORS,
    ADD_CREDIT,
    REMOVE_CREDIT,
    SET_CREDITS_LOADING,
    RESET_CREDIT
} from './constants';

const initialState = {
    credits: [],
    creditsSelect: [],
    storeCredits: [],
    credit: {
        _id: ''
    },
    creditFormData: {
        name: '',
        tags: '',
        isActive: true
    },
    formErrors: {},
    editFormErrors: {},
    isLoading: false
};

const creditReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CREDITS:
            return {
                ...state,
                credits: action.payload
            };
        case FETCH_STORE_CREDITS:
            return {
                ...state,
                storeCredits: action.payload
            };
        case FETCH_CREDITS_SELECT:
            return {
                ...state,
                creditsSelect: action.payload
            };
        case FETCH_CREDIT:
            return {
                ...state,
                credit: action.payload
            };
        case ADD_CREDIT:
            return {
                ...state,
                credits: [...state.credits, action.payload]
            };
        case REMOVE_CREDIT:
            const index = state.credits.findIndex(b => b._id === action.payload);
            return {
                ...state,
                credits: [
                    ...state.credits.slice(0, index),
                    ...state.credits.slice(index + 1)
                ]
            };
        case CREDIT_CHANGE:
            return {
                ...state,
                creditFormData: {
                    ...state.creditFormData,
                    ...action.payload
                }
            };
        case CREDIT_EDIT_CHANGE:
            return {
                ...state,
                credit: {
                    ...state.credit,
                    ...action.payload
                }
            };
        case SET_CREDIT_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case SET_CREDIT_FORM_EDIT_ERRORS:
            return {
                ...state,
                editFormErrors: action.payload
            };
        case SET_CREDITS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case RESET_CREDIT:
            return {
                ...state,
                creditFormData: initialState.creditFormData,
                credit: initialState.credit,
                formErrors: initialState.formErrors,
                editFormErrors: initialState.editFormErrors
            };
        default:
            return state;
    }
};

export default creditReducer;