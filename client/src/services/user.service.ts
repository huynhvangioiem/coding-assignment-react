import { User } from '@acme/shared-models';
import api from './api.service';

const BASE_PATH = '/users';

/**
 * Fetch all users
 */
export const getUsers = async (): Promise<User[]> => {
    return api.get<User[]>(BASE_PATH);
};

/**
 * Fetch a single user by ID
 */
export const getUser = async (id: number): Promise<User> => {
    return api.get<User>(`${BASE_PATH}/${id}`);
};

// Export all functions as a service object
export const userService = {
    getUsers,
    getUser,
};
