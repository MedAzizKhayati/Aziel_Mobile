import { axiosInstance } from './api.service';

export const getAllOrders = async (limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/orders/all/${limit}/${page}`)).data;
}

export const getOrdersByUser = async (id: string, limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/orders/user/${id}/${limit}/${page}`)).data;
}

export const getServicesByQuery = async (query: string, limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/orders/search/${query}/${limit}/${page}`)).data;
}