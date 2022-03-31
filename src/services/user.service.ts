import axios from 'axios';
import { baseUrl } from './api.service';

export const getOneByEmail = async (email: string): Promise<any> => {
    return (await axios.get(baseUrl + '/user', { params: { email } })).data;
}

export const registerUser = async (payload: any): Promise<any> => {
    return (await axios.post(baseUrl + '/user', payload)).data;
}

export const loginUser = async (payload: any): Promise<any> => {
    let response = (await axios.post(baseUrl + '/user/login', payload));
    console.log(response);
    return response.data;
}