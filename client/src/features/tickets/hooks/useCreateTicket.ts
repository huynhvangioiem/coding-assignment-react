import { useState, useCallback } from 'react';
import { ticketService } from '../../../services/ticket.service';
import { useTicketStore } from '../../../stores/ticketStore';

interface UseCreateTicketReturn {
    createTicket: (description: string) => Promise<void>;
    loading: boolean;
    error: string | null;
    resetError: () => void;
}

export const useCreateTicket = (): UseCreateTicketReturn => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Get the addTicket action from the store
    const addTicket = useTicketStore(state => state.addTicket);

    const createTicket = useCallback(async (description: string) => {
        setLoading(true);
        setError(null);

        try {
            // Call the API to create the ticket
            const newTicket = await ticketService.createTicket(description);

            // Add the ticket to the local store with the backend-generated ID
            addTicket(newTicket);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to create ticket';
            setError(errorMessage);
            throw err; // Re-throw to let the component handle it
        } finally {
            setLoading(false);
        }
    }, [addTicket]);

    const resetError = useCallback(() => {
        setError(null);
    }, []);

    return {
        createTicket,
        loading,
        error,
        resetError,
    };
};
