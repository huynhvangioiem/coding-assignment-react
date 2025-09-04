import React from "react";

export interface ErrorDisplayProps {
    error: Error | string | null;
    errorType?: string;
    onRetry?: () => void;
    retryButtonText?: string;
    className?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
    error,
    errorType = "data",
    onRetry,
    retryButtonText = "Try Again",
    className = "",
}) => {
    const errorMessage =
        error instanceof Error
            ? error.message
            : error || "Unknown error occurred";

    return (
        <div
            className={`min-h-screen bg-gray-50 flex items-center justify-center ${className}`}
        >
            <div className="text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    <p className="font-bold">Error loading {errorType}</p>
                    <p className="text-sm">{errorMessage}</p>
                </div>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        {retryButtonText}
                    </button>
                )}
            </div>
        </div>
    );
};
