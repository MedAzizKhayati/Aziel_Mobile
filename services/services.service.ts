import { axiosInstance } from './api.service';

export const getAllServices = async (limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/services/all/${limit}/${page}`)).data;
}

export const getPopularServices = async (limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/services/popular/${limit}/${page}`)).data;
}

export const getServicesByCategory = async (id: string, limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/services/category/${id}/${limit}/${page}`)).data;
}

export const getServicesByUser = async (id: string, limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/services/user/${id}/${limit}/${page}`)).data;
}

export const getServicesByQuery = async (query: string, limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/services/search/${query}/${limit}/${page}`)).data;
}
