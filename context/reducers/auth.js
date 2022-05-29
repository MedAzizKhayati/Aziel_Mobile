import { getUserMe, logout } from "../../services/user.service";

const auth = (state, { type, payload }) => {
    switch (type) {
        case 'LOGIN':
        case 'SET_USER':
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload,
            };
        case 'LOADING':
            logout();
            return {
                ...state,
                loading: true,
            };
        case 'LOADED':
            logout();
            return {
                ...state,
                loading: false,
            };
        case 'LOGOUT':
            logout();
            return {
                ...state,
                isAuthenticated: false,
                user: null
            };
        case 'BUYER_MODE':
            return {
                ...state,
                buyerMode: true,
            };
        case 'SELLER_MODE':
            return {
                ...state,
                buyerMode: false,
            };
        default:
            return state;
    }
}

export const setUserContext = async (authDispatch) => {
    authDispatch({
        type: 'SET_USER',
        payload: await getUserMe()
    });
}

export default auth;