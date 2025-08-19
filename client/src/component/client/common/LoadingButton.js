// LoadingButton.jsx
import React from "react";

const LoadingButton = ({
                           text,
                           loadingText,
                           onClick,
                           type = "button",
                           isLoading = false,
                           disabled = false,
                           className = "",
                       }) => {
    const isButtonDisabled = isLoading || disabled;

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={isButtonDisabled}
            aria-busy={isLoading ? "true" : "false"}
            aria-live="polite"
            className={[
                // base styles
                "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500",
                "disabled:opacity-60 disabled:cursor-not-allowed",
                // keep height stable so spinner আসলে লেআউট শিফট না হয়
                "min-h-10 px-4 py-2",
                className,
            ].join(" ")}
        >
            {isLoading && (
                <svg
                    className="h-5 w-5 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    role="img"
                    aria-label="Loading"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M12 2a10 10 0 00-10 10h4a6 6 0 016-6V2z"
                    />
                </svg>
            )}

            <span>
        {isLoading ? (loadingText ?? "Loading...") : text}
      </span>
        </button>
    );
};

export default LoadingButton;
