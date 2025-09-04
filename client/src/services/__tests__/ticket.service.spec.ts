import { ticketService } from './ticket.service';
import api from './api.service';

// Mock the API service
jest.mock('./api.service');
const mockApi = api as jest.Mocked<typeof api>;

// Mock data
const mockTicket = {
    id: 1,
    description: 'Fix login bug',
    assigneeId: null,
    completed: false,
};

const mockTickets = [mockTicket];

describe('ticketService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('getTickets', () => {
        it('should fetch all tickets successfully', async () => {
            // Mock successful API response
            mockApi.get.mockResolvedValue(mockTickets);

            const result = await ticketService.getTickets();

            // Verify API call
            expect(mockApi.get).toHaveBeenCalledWith('/tickets');
            expect(result).toEqual(mockTickets);
        });

        it('should handle API errors', async () => {
            // Mock API error
            const mockError = new Error('Failed to fetch tickets');
            mockApi.get.mockRejectedValue(mockError);

            await expect(ticketService.getTickets()).rejects.toThrow('Failed to fetch tickets');
            expect(mockApi.get).toHaveBeenCalledWith('/tickets');
        });
    });

    describe('getTicket', () => {
        it('should fetch a single ticket by ID', async () => {
            // Mock successful API response
            mockApi.get.mockResolvedValue(mockTicket);

            const result = await ticketService.getTicket(1);

            // Verify API call
            expect(mockApi.get).toHaveBeenCalledWith('/tickets/1');
            expect(result).toEqual(mockTicket);
        });
    });

    describe('createTicket', () => {
        it('should create a new ticket', async () => {
            const newTicket = { ...mockTicket, id: 2 };
            mockApi.post.mockResolvedValue(newTicket);

            const result = await ticketService.createTicket('New ticket description');

            // Verify API call
            expect(mockApi.post).toHaveBeenCalledWith('/tickets', { description: 'New ticket description' });
            expect(result).toEqual(newTicket);
        });
    });

    describe('assignUser', () => {
        it('should assign a user to a ticket', async () => {
            mockApi.put.mockResolvedValue(undefined);

            await ticketService.assignUser(1, 2);

            // Verify API call
            expect(mockApi.put).toHaveBeenCalledWith('/tickets/1/assign/2');
        });
    });

    describe('completeTicket', () => {
        it('should mark a ticket as complete', async () => {
            mockApi.put.mockResolvedValue(undefined);

            await ticketService.completeTicket(1);

            // Verify API call
            expect(mockApi.put).toHaveBeenCalledWith('/tickets/1/complete');
        });
    });
});
