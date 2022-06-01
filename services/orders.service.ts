import { axiosInstance } from './api.service';

export const getAllOrders = async (limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/orders/all/${limit}/${page}`)).data;
}

export const getOrdersByUser = async (limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/orders/buyer/${limit}/${page}/`)).data;
}

export const getOrdersAsSeller = async (limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/orders/seller/${limit}/${page}`)).data;
}

export const getServicesByQuery = async (query: string, limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/orders/search/${query}/${limit}/${page}`)).data;
}

export const getOrderById = async (id: string): Promise<any> => {
    return (await axiosInstance.get(`/orders/${id}`)).data;
}

export const getOrdersBeforeOrderAsBuyer = async (id: string, limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/orders/buyer/before/${id}/${limit}/${page}`)).data;
}

export const getOrdersBeforeOrderAsSeller = async (id: string, limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/orders/seller/before/${id}/${limit}/${page}`)).data;
}

export const deliverOrder = async (id: string, delivery: {}): Promise<any> => {
    return (await axiosInstance.post(`/orders/deliver/${id}`, delivery)).data;
}