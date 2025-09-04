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
import {
    LoadingSpinner,
    ErrorDisplay,
    EmptyState,
    EmptyStates,
} from "../../components/common";

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
        return <LoadingSpinner message="Loading tickets..." />;
    }

    // Show error state
    if (ticketsError || usersError) {
        const error = ticketsError || usersError;
        const refetch = ticketsError ? refetchTickets : refetchUsers;
        const errorType = ticketsError ? "tickets" : "users";

        return (
            <ErrorDisplay
                error={error}
                errorType={errorType}
                onRetry={refetch}
            />
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
                    <EmptyState {...EmptyStates.noTickets} />
                ) : filteredTickets.length === 0 && tickets.length > 0 ? (
                    <EmptyState {...EmptyStates.noFilteredResults} />
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
