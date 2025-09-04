import { useState, useCallback, useEffect } from 'react';
import { ticketService } from '../../../services/ticket.service';
import { useTicketStore } from '../../../stores/ticketStore';

interface UseTicketsReturn {
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export const useTickets = (): UseTicketsReturn => {
    // Local state for loading and error handling
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    // Get the setTickets function from our global store
    const setTickets = useTicketStore(state => state.setTickets);

    // Fetch tickets function
    const fetchTickets = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            const tickets = await ticketService.getTickets();
            setTickets(tickets);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch tickets'));
        } finally {
            setLoading(false);
        }
    }, [setTickets]);

    // Fetch tickets on component mount
    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    return {
        loading,
        error,
        refetch: fetchTickets,
    };
};
