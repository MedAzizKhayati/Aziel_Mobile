import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthTokens, clearAuthTokens } from 'react-native-axios-jwt';
import { axiosInstance } from './api.service';

export const getOneByEmail = async (email: string): Promise<any> => {
    return (await axiosInstance.get('/user', { params: { email } })).data;
}

export const getAllUsers = async (): Promise<any> => {
    return (await axiosInstance.get('/user/all')).data;
}

export const getUserMe = async (): Promise<any> => {
    try {
        const user = (await axiosInstance.get('/user/me')).data;
        AsyncStorage.setItem('user', JSON.stringify(user));
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
}


export const registerUser = async (payload: any): Promise<any> => {
    return (await axiosInstance.post('/user', payload)).data;
}

export const loginUser = async (payload: any): Promise<any> => {
    let response = (await axiosInstance.post('/user/login', payload));
    await setAuthTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token
    })
    AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
}

export const logout = () => { 
    clearAuthTokens()
    AsyncStorage.clear();
};

// const accessToken = getAccessToken().then(accessToken => console.log(accessToken));
// const refreshToken = getRefreshToken().then(refreshToken => console.log(refreshToken));