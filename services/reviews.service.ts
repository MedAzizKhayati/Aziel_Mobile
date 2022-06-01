import { axiosInstance } from './api.service';

export const getReviewsByService = async (id: string, limit: number = 10, page: number = 1): Promise<any> => {
    return (await axiosInstance.get(`/reviews/service/${id}/${limit}/${page}`)).data;
}