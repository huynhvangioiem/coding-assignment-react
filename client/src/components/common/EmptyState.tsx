import React from "react";

export interface EmptyStateProps {
    type: "no-data" | "no-results";
    title: string;
    description: string;
    className?: string;
    children?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    type,
    title,
    description,
    className = "",
    children,
}) => {
    return (
        <div className={`text-center py-12 ${className}`}>
            <p className="text-gray-500 text-lg">{title}</p>
            <p className="text-gray-400 text-sm mt-2">{description}</p>
            {children && <div className="mt-4">{children}</div>}
        </div>
    );
};

// Predefined empty state configurations
export const EmptyStates = {
    noTickets: {
        type: "no-data" as const,
        title: "No tickets found.",
        description: "Create your first ticket to get started.",
    },
    noFilteredResults: {
        type: "no-results" as const,
        title: "No tickets match your filters.",
        description: "Try adjusting your search criteria.",
    },
};
