import { useState, useCallback, useEffect } from 'react';
import { userService } from '../../../services/user.service';
import { useUserStore } from '../../../stores/userStore';

interface UseUsersReturn {
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export const useUsers = (): UseUsersReturn => {
    // Local state for loading and error handling
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Get the setUsers function from our global store
    const setUsers = useUserStore(state => state.setUsers);

    // Fetch users function
    const fetchUsers = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const users = await userService.getUsers();
            setUsers(users);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch users'));
        } finally {
            setLoading(false);
        }
    }, [setUsers]);

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return {
        loading,
        error,
        refetch: fetchUsers,
    };
};
