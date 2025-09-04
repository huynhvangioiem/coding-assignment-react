import React from "react";

export interface TicketHeaderProps {
    onAddTicket?: () => void;
}

export const TicketHeader: React.FC<TicketHeaderProps> = ({ onAddTicket }) => {
    return (
        <div className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Tickets
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Manage and track all tickets
                        </p>
                    </div>
                    <button
                        onClick={onAddTicket}
                        className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                    >
                        <svg
                            className="-ml-1 mr-2 h-4 w-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Add Ticket
                    </button>
                </div>
            </div>
        </div>
    );
};
