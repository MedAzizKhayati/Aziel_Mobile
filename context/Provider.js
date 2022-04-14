import React, { createContext, useEffect, useReducer } from "react";
import { getUserMe } from "../services/user.service";
import authInitialState from "./initial-states/authState";
import authReducer from "./reducers/auth";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(authReducer, authInitialState);

    useEffect(() => {
        getUserMe()
        .then(user => {
            authDispatch({ type: 'LOGIN', payload: user })
            console.log(user);
        })
        .catch(err => console.log(err));
    }, [])

    return (
        <GlobalContext.Provider value={{ authState, authDispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;