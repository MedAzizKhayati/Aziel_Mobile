import { TokenRefreshRequest, applyAuthTokenInterceptor, setAuthTokens } from 'react-native-axios-jwt';
import axios from 'axios'
import io from 'socket.io-client';

export const BASE_URL: string = "http://192.168.1.13:3000";

// We'll be using this axios instance across the whole application for fetching the API.
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
    console.log("\u001b[1;32mR. Token:", response.data.refresh_token.substring(0, 20) + "...");
    console.log("A. Token:", response.data.access_token.substring(0, 20) + "...");
    console.log( "\u001b[0m" );
    return response.data.access_token;
}

// 3. Add interceptor to your axios instance
applyAuthTokenInterceptor(axiosInstance, {
    requestRefresh,  // async function that takes a refreshToken and returns a promise the resolves in a fresh accessToken
    header: "Authorization",  // header name
    headerPrefix: "Bearer ",  // header value prefix
});


// Socket connections

export const chatSocket = io(BASE_URL + '/chat');
