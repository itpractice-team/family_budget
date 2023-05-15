/* eslint-disable import/prefer-default-export */
import {useSelector} from 'react-redux';

export function useAuth() {
    const {email, login, userName, phone, currency, token} = useSelector(state => state.user);
    // console.log('inAuth', email, userName, token)
    return {
        isAuth: !!email,
        email,
        login,
        userName,
        phone,
        currency,
        token,
    };
}