import { useState } from "react";
import {
    TicketHeader,
    SearchFilters,
    TicketList,
    AddTicketModal,
} from "../../features/tickets/components";
import {
    useTickets,
    useUsers,
    useCreateTicket,
} from "../../features/tickets/hooks";
import { useTicketStore } from "../../stores/ticketStore";
import { useUserStore } from "../../stores/userStore";

export function Tickets() {
    // State for search and filters
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");
    const [assigneeFilter, setAssigneeFilter] = useState("All Assignees");

    // State for add ticket modal
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const {
        loading: ticketsLoading,
        error: ticketsError,
        refetch: refetchTickets,
    } = useTickets();
    const {
        loading: usersLoading,
        error: usersError,
        refetch: refetchUsers,
    } = useUsers();
    const {
        createTicket,
        loading: createLoading,
        error: createError,
        resetError,
    } = useCreateTicket();

    const tickets = useTicketStore((state) => state.tickets);
    const users = useUserStore((state) => state.users);

    const filteredTickets = tickets.filter((ticket) => {
        const matchesSearch = ticket.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All Status" ||
            (statusFilter === "Completed" && ticket.completed) ||
            (statusFilter === "Pending" && !ticket.completed);

        const matchesAssignee =
            assigneeFilter === "All Assignees" ||
            (assigneeFilter === "Assigned" && ticket.assigneeId !== null) ||
            (assigneeFilter === "Unassigned" && ticket.assigneeId === null);

        return matchesSearch && matchesStatus && matchesAssignee;
    });

    // Event handlers
    const handleAddTicket = () => {
        setIsAddModalOpen(true);
        resetError();
    };

    const handleCloseAddModal = () => {
        setIsAddModalOpen(false);
        resetError();
    };

    const handleCreateTicket = async (description: string) => {
        await createTicket(description);
        // Modal will close automatically on success
    };

    const handleEditTicket = (id: number) => {
        console.log("Edit ticket:", id);
        // TODO: Implement edit ticket functionality
    };

    const handleCompleteTicket = (id: number) => {
        console.log("Complete ticket:", id);
        // TODO: Implement complete ticket functionality
    };

    const handleDeleteTicket = (id: number) => {
        console.log("Delete ticket:", id);
        // TODO: Implement delete ticket functionality
    };

    // Show loading state
    if (ticketsLoading || usersLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">
                        {ticketsLoading
                            ? "Loading tickets..."
                            : "Loading users..."}
                    </p>
                </div>
            </div>
        );
    }

    // Show error state
    if (ticketsError || usersError) {
        const error = ticketsError || usersError;
        const refetch = ticketsError ? refetchTickets : refetchUsers;
        const errorType = ticketsError ? "tickets" : "users";

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        <p className="font-bold">Error loading {errorType}</p>
                        <p className="text-sm">
                            {error?.message || "Unknown error occurred"}
                        </p>
                    </div>
                    <button
                        onClick={refetch}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <TicketHeader onAddTicket={handleAddTicket} />

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <SearchFilters
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    statusFilter={statusFilter}
                    onStatusFilterChange={setStatusFilter}
                    assigneeFilter={assigneeFilter}
                    onAssigneeFilterChange={setAssigneeFilter}
                />

                {/* Show message if no tickets */}
                {filteredTickets.length === 0 && tickets.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No tickets found.
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Create your first ticket to get started.
                        </p>
                    </div>
                ) : filteredTickets.length === 0 && tickets.length > 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">
                            No tickets match your filters.
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                            Try adjusting your search criteria.
                        </p>
                    </div>
                ) : (
                    <TicketList
                        tickets={filteredTickets}
                        users={users}
                        onEdit={handleEditTicket}
                        onComplete={handleCompleteTicket}
                        onDelete={handleDeleteTicket}
                    />
                )}
            </div>

            {/* Add Ticket Modal */}
            <AddTicketModal
                isOpen={isAddModalOpen}
                onClose={handleCloseAddModal}
                onSubmit={handleCreateTicket}
                loading={createLoading}
            />
        </div>
    );
}

export default Tickets;
