import React from "react";
import { Ticket, User } from "@acme/shared-models";
import { TicketCard } from "./TicketCard";

export interface TicketListProps {
    tickets: Ticket[];
    users: User[];
    onEdit?: (id: number) => void;
    onComplete?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export const TicketList: React.FC<TicketListProps> = ({
    tickets,
    users,
    onEdit,
    onComplete,
    onDelete,
}) => {
    const getUserById = (id: number | null) => {
        if (id === null) return null;
        return users.find((user) => user.id === id) || null;
    };

    if (tickets.length === 0) {
        return (
            <div className="text-center py-12">
                <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                    No tickets
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                    Get started by creating a new ticket.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tickets.map((ticket) => {
                const assignee = getUserById(ticket.assigneeId);
                return (
                    <TicketCard
                        key={ticket.id}
                        ticket={ticket}
                        assignee={assignee}
                        onEdit={onEdit}
                        onComplete={onComplete}
                        onDelete={onDelete}
                    />
                );
            })}
        </div>
    );
};
