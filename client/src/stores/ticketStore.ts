import { create } from 'zustand';
import { Ticket } from '@acme/shared-models';

// Interface for the ticket store state
interface TicketState {
    tickets: Ticket[];
}

// Interface for the ticket store actions (domain only)
interface TicketActions {
    // CRUD operations
    addTicket: (ticket: Omit<Ticket, 'id'>) => void;
    updateTicket: (id: number, updates: Partial<Omit<Ticket, 'id'>>) => void;
    deleteTicket: (id: number) => void;

    // Domain-level bulk replace (kept for API hydration)
    setTickets: (tickets: Ticket[]) => void;

    // Computed getters
    getTicketById: (id: number) => Ticket | undefined;
    getCompletedTickets: () => Ticket[];
    getPendingTickets: () => Ticket[];
    getTicketsByAssignee: (assigneeId: number) => Ticket[];
}

// Combined store interface
type TicketStore = TicketState & TicketActions;

// Create the Zustand store (domain-focused)
export const useTicketStore = create<TicketStore>()(
    (set, get) => ({
        // Initial state
        tickets: [],

        // CRUD Actions
        addTicket: (ticketData) => {
            const tickets = get().tickets;
            // Generate a new ID (in a real app, this would come from the backend)
            const newId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;

            const newTicket: Ticket = {
                id: newId,
                ...ticketData,
            };

            set(
                (state) => ({
                    tickets: [...state.tickets, newTicket],
                }),
                false
            );
        },

        updateTicket: (id, updates) => {
            set(
                (state) => ({
                    tickets: state.tickets.map((ticket) =>
                        ticket.id === id ? { ...ticket, ...updates } : ticket
                    ),
                }),
                false
            );
        },

        deleteTicket: (id) => {
            set(
                (state) => ({
                    tickets: state.tickets.filter((ticket) => ticket.id !== id),
                }),
                false
            );
        },

        // Bulk replace after fetch/sync
        setTickets: (tickets) => {
            set(
                { tickets },
                false
            );
        },

        // Computed getters (pure helpers)
        getTicketById: (id) => {
            return get().tickets.find((ticket) => ticket.id === id);
        },

        getCompletedTickets: () => {
            return get().tickets.filter((ticket) => ticket.completed);
        },

        getPendingTickets: () => {
            return get().tickets.filter((ticket) => !ticket.completed);
        },

        getTicketsByAssignee: (assigneeId) => {
            return get().tickets.filter((ticket) => ticket.assigneeId === assigneeId);
        },
    })
);
