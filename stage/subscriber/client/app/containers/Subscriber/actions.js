/*
 *
 * Subscriber actions
 *
 */

import { goBack } from 'connected-react-router';
import { success } from 'react-notification-system-redux';
import axios from 'axios';

import {
    FETCH_SUBSCRIBERS,
    FETCH_STORE_SUBSCRIBERS,
    FETCH_SUBSCRIBER,
    SUBSCRIBER_CHANGE,
    SUBSCRIBER_EDIT_CHANGE,
    FETCH_SUBSCRIBERS_SELECT,
    SET_SUBSCRIBER_FORM_ERRORS,
    SET_SUBSCRIBER_FORM_EDIT_ERRORS,
    ADD_SUBSCRIBER,
    REMOVE_SUBSCRIBER,
    SET_SUBSCRIBERS_LOADING,
    RESET_SUBSCRIBER
} from './constants';

import handleError from '../../utils/error';
import {
    formatSelectOptions,
    unformatSelectOptions
} from '../../helpers/select';
import { allFieldsValidation } from '../../utils/validation';

export const subscriberChange = (name, value) => {
    let formData = {};
    formData[name] = value;

    return {
        type: SUBSCRIBER_CHANGE,
        payload: formData
    };
};

export const subscriberEditChange = (name, value) => {
    let formData = {};
    formData[name] = value;

    return {
        type: SUBSCRIBER_EDIT_CHANGE,
        payload: formData
    };
};

export const subscriberSelect = value => {
    return {
        type: SUBSCRIBER_SELECT,
        payload: value
    };
};

export const resetSubscriber = () => {
    return async (dispatch, getState) => {
        dispatch({ type: RESET_SUBSCRIBER });
    };
};

// fetch store subscribers api
export const fetchStoreSubscribers = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`/api/subscriber/list`);

            dispatch({
                type: FETCH_STORE_SUBSCRIBERS,
                payload: response.data.subscribers
            });
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// fetch subscribers api
export const fetchSubscribers = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: SET_SUBSCRIBERS_LOADING, payload: true });
            const response = await axios.get(`/api/subscriber`);

            dispatch({
                type: FETCH_SUBSCRIBERS,
                payload: response.data.subscribers
            });
        } catch (error) {
            handleError(error, dispatch);
        } finally {
            dispatch({ type: SET_SUBSCRIBERS_LOADING, payload: false });
        }
    };
};

// fetch subscriber api
export const fetchSubscriber = id => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`/api/subscriber/${id}`);
            dispatch({
                type: FETCH_SUBSCRIBER,
                payload: response.data.subscriber
            });
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// add subscriber api
export const addSubscriber = () => {
    return async (dispatch, getState) => {
        try {
            const rules = {
                name: 'required' 
            };

            const subscriber = getState().subscriber.subscriberFormData;

            const newSubscriber = {
                name: subscriber.name 
            };

            const { isValid, errors } = allFieldsValidation(newSubscriber, rules, {
                'required.name': 'Name is required.'
            });

            if (!isValid) {
                return dispatch({ type: SET_SUBSCRIBER_FORM_ERRORS, payload: errors });
            }

            const response = await axios.post(`/api/subscriber/add`, newSubscriber);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                dispatch(success(successfulOptions));
                dispatch({
                    type: ADD_SUBSCRIBER,
                    payload: response.data.subscriber
                });
                dispatch(resetSubscriber());
                dispatch(goBack());
            }
        } catch (error) {
            handleError(error, dispatch);
        }
    };
};

// update subscriber api
export const updateSubscriber = () => {
    return async (dispatch, getState) => {
        try {
            const rules = {
                name: 'required' 
            };

            const subscriber = getState().subscriber.subscriber;

            const newSubscriber = {
                name: subscriber.name 
            };

            const { isValid, errors } = allFieldsValidation(newSubscriber, rules, {
                'required.name': 'Name is required.' 
            });

            if (! isValid) {
                return dispatch({
                    type: SET_SUBSCRIBER_FORM_EDIT_ERRORS,
                    payload: errors
                });
            }

            const id = subscriber._id;
            const response = await axios.put(`/api/subscriber/${id}`, {
                subscriber: newSubscriber
            });

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success === true) {
                dispatch(success(successfulOptions));
                dispatch(resetSubscriber());
                dispatch(goBack());
            }
        } 
        catch (error) {
            handleError(error, dispatch);
        }
    };
};

// activate subscriber api
export const activateSubscriber = (id, value) => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.put(`/api/subscriber/${id}/active`, {
                subscriber: {
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

// delete subscriber api
export const deleteSubscriber = id => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.delete(`/api/subscriber/delete/${id}`);

            const successfulOptions = {
                title: `${response.data.message}`,
                position: 'tr',
                autoDismiss: 1
            };

            if (response.data.success == true) {
                dispatch(success(successfulOptions));
                dispatch({
                    type: REMOVE_SUBSCRIBER,
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


export const fetchSubscribersSelect = () => {
    return async (dispatch, getState) => {
        try {
            const response = await axios.get(`/api/subscriber/list/select`);

            console.log('Subscribers', response)
            console.log(
                'formatSelectOptions(response.data.subscribers, true)', 
                formatSelectOptions(response.data.subscribers, true)
            )

            dispatch({
                type: FETCH_SUBSCRIBERS_SELECT,
                payload: formatSelectOptions(response.data.subscribers, false)
            });
        } 
        catch (error) {
            handleError(error, dispatch);
        }
    };
};