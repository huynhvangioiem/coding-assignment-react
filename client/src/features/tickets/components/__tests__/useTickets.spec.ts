import { renderHook, waitFor, act } from '@testing-library/react';
import { useTickets } from '../hooks/useTickets';
import { ticketService } from '../../../services/ticket.service';
import { useTicketStore } from '../../../stores/ticketStore';

// Mock the ticket service
jest.mock('../../../services/ticket.service');
const mockTicketService = ticketService as jest.Mocked<typeof ticketService>;

// Mock the ticket store
jest.mock('../../../stores/ticketStore');
const mockUseTicketStore = useTicketStore as jest.MockedFunction<typeof useTicketStore>;

// Mock data
const mockTickets = [
  {
    id: 1,
    description: 'Fix login bug',
    assigneeId: null,
    completed: false,
  },
  {
    id: 2,
    description: 'Update user profile',
    assigneeId: 1,
    completed: true,
  },
];

describe('useTickets', () => {
  // Mock store state and actions
  const mockSetTickets = jest.fn();
  const mockStoreState = {
    tickets: [],
    setTickets: mockSetTickets,
    addTicket: jest.fn(),
    updateTicket: jest.fn(),
    deleteTicket: jest.fn(),
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Setup store mock
    mockUseTicketStore.mockImplementation((selector) => {
      if (typeof selector === 'function') {
        return selector(mockStoreState);
      }
      return mockStoreState;
    });
  });

  describe('core functionality', () => {
    it('should fetch tickets on mount and update store', async () => {
      // Mock successful API call
      mockTicketService.getTickets.mockResolvedValue(mockTickets);

      renderHook(() => useTickets());

      // Wait for the effect to complete and store to be updated
      await waitFor(() => {
        expect(mockTicketService.getTickets).toHaveBeenCalledTimes(1);
        expect(mockSetTickets).toHaveBeenCalledWith(mockTickets);
      });
    });

    it('should provide loading state during fetch', async () => {
      // Mock successful API call
      mockTicketService.getTickets.mockResolvedValue(mockTickets);

      const { result } = renderHook(() => useTickets());

      // Initial state should have loading true
      expect(result.current.loading).toBe(true);

      // Wait for loading to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });
    });

    it('should handle API errors gracefully', async () => {
      // Mock API error
      const mockError = new Error('Failed to fetch tickets');
      mockTicketService.getTickets.mockRejectedValue(mockError);

      const { result } = renderHook(() => useTickets());

      // Wait for error to be set
      await waitFor(() => {
        expect(result.current.error).toEqual(mockError);
        expect(result.current.loading).toBe(false);
      });

      // Should not call setTickets on error
      expect(mockSetTickets).not.toHaveBeenCalled();
    });
  });

  describe('refetch functionality', () => {
    it('should allow manual refetch of tickets', async () => {
      // Mock successful API call
      mockTicketService.getTickets.mockResolvedValue(mockTickets);

      const { result } = renderHook(() => useTickets());

      // Wait for initial fetch to complete
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      // Reset mock to verify refetch call
      mockTicketService.getTickets.mockClear();
      mockSetTickets.mockClear();

      // Trigger manual refetch
      await act(async () => {
        await result.current.refetch();
      });

      // Verify refetch was called
      expect(mockTicketService.getTickets).toHaveBeenCalledTimes(1);
      expect(mockSetTickets).toHaveBeenCalledWith(mockTickets);
    });
  });
});
