import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthTokens, clearAuthTokens } from 'react-native-axios-jwt';
import { axiosInstance, BASE_URL } from './api.service';
import axios from 'axios';

export const getOneByEmail = async (email: string): Promise<any> => {
    return (await axiosInstance.get('/user', { params: { email } })).data;
}

export const getAllUsers = async (): Promise<any> => {
    return (await axiosInstance.get('/user/all')).data;
}

export const getUserMe = async (): Promise<any> => {
    const user = (await axiosInstance.get('/user/me'))?.data?.user;
    AsyncStorage.setItem('user', JSON.stringify(user));
    return user;
}


export const registerUser = async (payload: any): Promise<any> => {
    return (await axios.post(BASE_URL + '/user', payload)).data;
}

export const loginUser = async (payload: any): Promise<any> => {
    let response;
    try {
        response = (await axios.post(BASE_URL + '/user/login', payload));
    } catch (err : any) {
        console.log(err?.response?.data);
        throw err?.response?.data;
    }
    await setAuthTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token
    })
    AsyncStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data.user;
}

export const logout = () => {
    clearAuthTokens()
    AsyncStorage.removeItem('user', err => {
        if (err) {
            console.log(err);
            return;
        }
    });
};