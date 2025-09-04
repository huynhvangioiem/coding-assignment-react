import React from "react";

export interface TicketStatusBadgeProps {
    completed: boolean;
}

export const TicketStatusBadge: React.FC<TicketStatusBadgeProps> = ({
    completed,
}) => {
    return (
        <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                completed
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
            }`}
        >
            {completed ? "Completed" : "Pending"}
        </span>
    );
};
