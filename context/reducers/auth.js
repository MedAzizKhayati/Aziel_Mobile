import { logout } from "../../services/user.service"

const auth = (state, { type, payload }) => {
    switch (type) {
        case 'LOGIN':
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
        default:
            return state;
    }
}


export default auth;