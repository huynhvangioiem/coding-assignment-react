import { create } from 'zustand';
import { User } from '@acme/shared-models';

// Interface for the user store state
interface UserState {
    users: User[];
}

// Interface for the user store actions
interface UserActions {
    // Set all users (for API hydration)
    setUsers: (users: User[]) => void;

    // Get all users
    getAllUsers: () => User[];

    // Get user by ID
    getUserById: (id: number) => User | undefined;
}

// Combined store interface
type UserStore = UserState & UserActions;

// Create the Zustand store
export const useUserStore = create<UserStore>()(
    (set, get) => ({
        // Initial state
        users: [],

        // Set users from API
        setUsers: (users) => {
            set({ users }, false);
        },

        // Get all users
        getAllUsers: () => {
            return get().users;
        },

        // Get user by ID
        getUserById: (id) => {
            return get().users.find((user) => user.id === id);
        },
    })
);
