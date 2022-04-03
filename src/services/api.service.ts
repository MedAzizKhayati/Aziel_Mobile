import { TokenRefreshRequest, applyAuthTokenInterceptor, setAuthTokens } from 'react-native-axios-jwt';
import axios from 'axios'

export const BASE_URL: string = "http://192.168.1.14:3000";

export const axiosInstance = axios.create({ baseURL: BASE_URL });

// Define token refresh function.
const requestRefresh: TokenRefreshRequest = async (refreshToken: string): Promise<string> => {

    // Important! Do NOT use the axios instance that you supplied to applyAuthTokenInterceptor
    // because this will result in an infinite loop when trying to refresh the token.
    // Use the global axios client or a different instance
    const axiosRefresh = axios.create({
        baseURL: BASE_URL,
        headers: { Authorization: `Bearer ${refreshToken}` }
    });
    console.log("Refreshing Access Token ...");

    const response = await axiosRefresh.post(`/user/refresh`);

    await setAuthTokens({
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token
    });
    return response.data.access_token;
}

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(axiosInstance, {
    requestRefresh,  // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
    header: "Authorization",  // header name
    headerPrefix: "Bearer ",  // header value prefix
});