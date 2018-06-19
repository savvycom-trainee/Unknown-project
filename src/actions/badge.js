import { ADD_NEW_NOTIFICATION, SEEN_NOTIFICATION } from '../constants/actionTypes';

export const addNotification = () => ({ type: ADD_NEW_NOTIFICATION });

export const removeNotification = () => ({ type: SEEN_NOTIFICATION });
