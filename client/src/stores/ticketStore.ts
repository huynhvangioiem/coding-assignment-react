import { create } from 'zustand';
import { Ticket } from '@acme/shared-models';

// Interface for the ticket store state
interface TicketState {
    tickets: Ticket[];
}

// Interface for the ticket store actions (domain only)
interface TicketActions {
    // CRUD operations
    addTicket: (ticket: Ticket) => void;
    updateTicket: (id: number, updates: Partial<Omit<Ticket, 'id'>>) => void;
    deleteTicket: (id: number) => void;

    // Domain-level bulk replace (kept for API hydration)
    setTickets: (tickets: Ticket[]) => void;
}

// Combined store interface
type TicketStore = TicketState & TicketActions;

// Create the Zustand store (domain-focused)
export const useTicketStore = create<TicketStore>()(
    (set, get) => ({
        // Initial state
        tickets: [],

        // CRUD Actions
        addTicket: (ticket: Ticket) => {
            set(
                (state) => ({
                    tickets: [...state.tickets, ticket],
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
    })
);
