import { Ticket } from '@acme/shared-models';
import api from './api.service';

const BASE_PATH = '/tickets';

/**
 * Fetch all tickets
 */
export const getTickets = async (): Promise<Ticket[]> => {
    return api.get<Ticket[]>(BASE_PATH);
};

/**
 * Fetch a single ticket by ID
 */
export const getTicket = async (id: number): Promise<Ticket> => {
    return api.get<Ticket>(`${BASE_PATH}/${id}`);
};

/**
 * Create a new ticket
 */
export const createTicket = async (description: string): Promise<Ticket> => {
    return api.post<Ticket>(BASE_PATH, { description });
};

/**
 * Assign a user to a ticket
 */
export const assignUser = async (ticketId: number, userId: number): Promise<void> => {
    await api.put<void>(`${BASE_PATH}/${ticketId}/assign/${userId}`);
};

/**
 * Unassign a user from a ticket
 */
export const unassignUser = async (ticketId: number): Promise<void> => {
    await api.put<void>(`${BASE_PATH}/${ticketId}/unassign`);
};

/**
 * Mark a ticket as complete
 */
export const completeTicket = async (ticketId: number): Promise<void> => {
    await api.put<void>(`${BASE_PATH}/${ticketId}/complete`);
};

/**
 * Mark a ticket as incomplete
 */
export const uncompleteTicket = async (ticketId: number): Promise<void> => {
    await api.delete<void>(`${BASE_PATH}/${ticketId}/complete`);
};

// Export all functions as a service object
export const ticketService = {
    getTickets,
    getTicket,
    createTicket,
    assignUser,
    unassignUser,
    completeTicket,
    uncompleteTicket,
};
