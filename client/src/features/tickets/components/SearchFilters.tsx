import React from "react";

export interface SearchFiltersProps {
    searchTerm?: string;
    onSearchChange?: (value: string) => void;
    statusFilter?: string;
    onStatusFilterChange?: (value: string) => void;
    assigneeFilter?: string;
    onAssigneeFilterChange?: (value: string) => void;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
    searchTerm = "",
    onSearchChange,
    statusFilter = "All Status",
    onStatusFilterChange,
    assigneeFilter = "All Assignees",
    onAssigneeFilterChange,
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <svg
                                className="h-5 w-5 text-gray-400"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange?.(e.target.value)}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3">
                    <select
                        value={statusFilter}
                        onChange={(e) => onStatusFilterChange?.(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option>All Status</option>
                        <option>Completed</option>
                        <option>Pending</option>
                    </select>

                    <select
                        value={assigneeFilter}
                        onChange={(e) =>
                            onAssigneeFilterChange?.(e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option>All Assignees</option>
                        <option>Assigned</option>
                        <option>Unassigned</option>
                    </select>
                </div>
            </div>
        </div>
    );
};
