import { AxiosError, AxiosInstance, AxiosRequestConfig, default as axios } from 'axios';

/**
 * Interface for API error response
 */
export interface ApiErrorResponse {
    message: string;
    statusCode?: number;
    error?: string;
}

const BASE_URL = '/api';

/**
 * Create axios instance with default configuration
 */
const createApiInstance = (baseURL: string = BASE_URL): AxiosInstance => {
    const api = axios.create({
        baseURL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    // Request interceptor
    api.interceptors.request.use(
        (config) => {
            // add token if needed
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Response interceptor
    api.interceptors.response.use(
        (response) => response,
        (error: AxiosError<ApiErrorResponse>) => {
            // Handle common error scenarios
            if (error.response?.status === 401) {
                // handle unauthorized access
            }
            return Promise.reject(handleError(error));
        }
    );

    return api;
};

/**
 * Handle API errors
 */
const handleError = (error: AxiosError<ApiErrorResponse>): Error => {
    const message = error.response?.data?.message || error.message;
    return new Error(message);
};

// Create default API instance
const defaultApi = createApiInstance();

/**
 * GET request
 */
export const get = async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await defaultApi.get<T>(endpoint, config);
    return response.data;
};

/**
 * POST request
 */
export const post = async <T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await defaultApi.post<T>(endpoint, data, config);
    return response.data;
};

/**
 * PUT request
 */
export const put = async <T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await defaultApi.put<T>(endpoint, data, config);
    return response.data;
};

/**
 * DELETE request
 */
export const del = async <T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await defaultApi.delete<T>(endpoint, config);
    return response.data;
};

/**
 * PATCH request
 */
export const patch = async <T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
    const response = await defaultApi.patch<T>(endpoint, data, config);
    return response.data;
};

// Export all HTTP methods
export const api = {
    get,
    post,
    put,
    delete: del,
    patch,
};

export default api;
