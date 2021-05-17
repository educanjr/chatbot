import AuthService from '../../services/authService';
import { LOGIN, LOGOUT, REGISTER } from '../types/index';

export const login = (params, history) => dispatch => {
    return AuthService.login(params)
        .then(data => {
            dispatch({ type: LOGIN, payload: data });
            history.push('/');
        })
        .catch(err => {
            console.error("Error on action", err);
        });
}

export const register = (params, history) => dispatch => {
    return AuthService.register(params)
        .then(data => {
            dispatch({ type: REGISTER, payload: data });
            history.push('/');
        })
        .catch(err => {
            console.error("Error on action", err);
        });
}

export const logout = () => dispatch => {
    AuthService.register();
    dispatch({ type: LOGOUT });
}