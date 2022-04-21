import { axiosInstance, BASE_URL } from './api.service';

export const getAllServiceCategories = async (): Promise<any> => {
    return (await axiosInstance.get('/service-categories')).data;
}