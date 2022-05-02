/*
 *
 * Subscriber reducer
 *
 */

import {
    FETCH_SUBSCRIBERS,
    FETCH_SUBSCRIBERS_SELECT,
    FETCH_STORE_SUBSCRIBERS,
    FETCH_SUBSCRIBER,
    SUBSCRIBER_CHANGE,
    SUBSCRIBER_EDIT_CHANGE,
    SET_SUBSCRIBER_FORM_ERRORS,
    SET_SUBSCRIBER_FORM_EDIT_ERRORS,
    ADD_SUBSCRIBER,
    REMOVE_SUBSCRIBER,
    SET_SUBSCRIBERS_LOADING,
    RESET_SUBSCRIBER
} from './constants';

const initialState = {
    subscribers: [],
    subscribersSelect: [],
    storeSubscribers: [],
    subscriber: {
        _id: ''
    },
    subscriberFormData: {
        name: '',
        tags: '',
        isActive: true
    },
    formErrors: {},
    editFormErrors: {},
    isLoading: false
};

const subscriberReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUBSCRIBERS:
            return {
                ...state,
                subscribers: action.payload
            };
        case FETCH_STORE_SUBSCRIBERS:
            return {
                ...state,
                storeSubscribers: action.payload
            };
        case FETCH_SUBSCRIBERS_SELECT:
            return {
                ...state,
                subscribersSelect: action.payload
            };
        case FETCH_SUBSCRIBER:
            return {
                ...state,
                subscriber: action.payload
            };
        case ADD_SUBSCRIBER:
            return {
                ...state,
                subscribers: [...state.subscribers, action.payload]
            };
        case REMOVE_SUBSCRIBER:
            const index = state.subscribers.findIndex(b => b._id === action.payload);
            return {
                ...state,
                subscribers: [
                    ...state.subscribers.slice(0, index),
                    ...state.subscribers.slice(index + 1)
                ]
            };
        case SUBSCRIBER_CHANGE:
            return {
                ...state,
                subscriberFormData: {
                    ...state.subscriberFormData,
                    ...action.payload
                }
            };
        case SUBSCRIBER_EDIT_CHANGE:
            return {
                ...state,
                subscriber: {
                    ...state.subscriber,
                    ...action.payload
                }
            };
        case SET_SUBSCRIBER_FORM_ERRORS:
            return {
                ...state,
                formErrors: action.payload
            };
        case SET_SUBSCRIBER_FORM_EDIT_ERRORS:
            return {
                ...state,
                editFormErrors: action.payload
            };
        case SET_SUBSCRIBERS_LOADING:
            return {
                ...state,
                isLoading: action.payload
            };
        case RESET_SUBSCRIBER:
            return {
                ...state,
                subscriberFormData: initialState.subscriberFormData,
                subscriber: initialState.subscriber,
                formErrors: initialState.formErrors,
                editFormErrors: initialState.editFormErrors
            };
        default:
            return state;
    }
};

export default subscriberReducer;