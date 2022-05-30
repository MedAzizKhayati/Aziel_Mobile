import { getAccessToken } from 'react-native-axios-jwt';
import { axiosInstance } from './api.service';

export const getAllServiceCategories = async (): Promise<any> => {
    return (await axiosInstance.get('/service-categories')).data;
}