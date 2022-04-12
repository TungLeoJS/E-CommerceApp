import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from './userRedux';
import { publicRequest } from '../requestMethod';

export const login = async (dispatch, user) => {
    dispatch(loginStart());
    try {
        const res = await publicRequest.post('/auth/login', user);
        if (res && res.data) {
            dispatch(loginSuccess(res.data));
        }
    } catch (err) {
        dispatch(loginFailure());
    }
};

export const logout = async (dispatch) => {
    dispatch(logoutStart());
    try {
        dispatch(logoutSuccess());
    } catch (err) {
        dispatch(logoutFailure());
    }
};