import axios from 'axios';
import { baseUrl } from './api.service';

export const getOneByEmail = async (email: string): Promise<any> => {
    return (await axios.get(baseUrl + '/user', { params: { email } })).data;
}

export const registerUser = async (payload: any): Promise<any> => {
    return (await axios.post(baseUrl + '/user', payload)).data;
}