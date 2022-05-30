import React, { createContext, useEffect, useReducer } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserMe } from "../services/user.service";
import authInitialState from "./initial-states/authState";
import authReducer from "./reducers/auth";
import useColorScheme from "../hooks/useColorScheme";
import { getUnreadMessagesCount } from "../services/chat.service";

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
    const [authState, authDispatch] = useReducer(authReducer, authInitialState);
    const colorScheme = useColorScheme();

    useEffect(async () => {
        try {
            const user = await getUserMe();
            authDispatch({ type: 'LOGIN', payload: user });
            console.log(`\u001b[1;35m[${user.email}] has logged in!\u001b[0m`);

            const clientMode = await AsyncStorage.getItem('mode');
            authDispatch({ type: clientMode });

            const unreadMessagesCount = await getUnreadMessagesCount();
            authDispatch({ type: 'SET_UNREAD_MESSAGES_COUNT', payload: unreadMessagesCount });
            authDispatch({ type: 'LOADED' });

        } catch (err) {
            authDispatch({ type: 'LOADED' });
            return console.log(err);
        }
        
    }, []);

    return (
        <GlobalContext.Provider value={{ authState, authDispatch }}>
            {children}
        </GlobalContext.Provider>
    );
}

export default GlobalProvider;