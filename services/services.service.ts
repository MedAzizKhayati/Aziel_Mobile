import { axiosInstance } from './api.service';

export const getAllServices = async (): Promise<any> => {
    return (await axiosInstance.get('/services')).data;
}

export const getPopularServices = async (limit: number): Promise<any> => {
    return (await axiosInstance.get(`/services/popular/${limit}`)).data;
}

export const getServicesByCategory = async (id: string): Promise<any> => {
    return (await axiosInstance.get('/services/category/'+id)).data;
}

export const getServicesByUser = async (id: string): Promise<any> => {
    return (await axiosInstance.get('/services/user/'+id)).data;
}