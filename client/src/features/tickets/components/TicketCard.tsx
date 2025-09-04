import React from "react";
import { Ticket, User } from "@acme/shared-models";
import { TicketStatusBadge } from "./TicketStatusBadge";
import { TicketActions } from "./TicketActions";

export interface TicketCardProps {
    ticket: Ticket;
    assignee?: User | null;
    onEdit?: (id: number) => void;
    onComplete?: (id: number) => void;
    onDelete?: (id: number) => void;
}

export const TicketCard: React.FC<TicketCardProps> = ({
    ticket,
    assignee,
    onEdit,
    onComplete,
    onDelete,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
            <div className="p-6">
                <div className="flex items-center justify-between">
                    {/* Left side - Ticket info */}
                    <div className="flex items-center space-x-4 flex-1">
                        {/* Status indicator */}
                        <div className="flex-shrink-0">
                            {ticket.completed ? (
                                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                    <svg
                                        className="w-4 h-4 text-green-600"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                            ) : (
                                <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                                    <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                                </div>
                            )}
                        </div>

                        {/* Ticket content */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3">
                                <h3 className="text-sm font-medium text-gray-900 truncate">
                                    #{ticket.id} {ticket.description}
                                </h3>
                                <TicketStatusBadge
                                    completed={ticket.completed}
                                />
                            </div>

                            {/* Assignee info */}
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                                {assignee ? (
                                    <span className="flex items-center">
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Assigned to {assignee.name}
                                    </span>
                                ) : (
                                    <span className="flex items-center text-gray-400">
                                        <svg
                                            className="w-4 h-4 mr-1"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        Unassigned
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right side - Actions */}
                    <TicketActions
                        ticketId={ticket.id}
                        onEdit={onEdit}
                        onComplete={onComplete}
                        onDelete={onDelete}
                    />
                </div>
            </div>
        </div>
    );
};
