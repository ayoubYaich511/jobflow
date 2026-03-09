// Error handling utilities
export class ErrorHandler {
	static handleErrors(error: any): string {
		console.log("ErrorHandler: handleErrors called with", error);

		// Mock error handling - return user-friendly messages
		if (typeof error === "string") {
			return error;
		}

		if (error?.message) {
			return error.message;
		}

		if (error?.response?.data?.message) {
			return error.response.data.message;
		}

		if (error?.response?.status) {
			switch (error.response.status) {
				case 400:
					return "Invalid request. Please check your input.";
				case 401:
					return "You are not authorized. Please log in again.";
				case 403:
					return "You do not have permission to perform this action.";
				case 404:
					return "The requested resource was not found.";
				case 500:
					return "Server error. Please try again later.";
				default:
					return "An unexpected error occurred. Please try again.";
			}
		}

		return "Something went wrong. Please try again.";
	}

	static isNetworkError(error: any): boolean {
		return (
			error?.code === "NETWORK_ERROR" ||
			error?.message?.includes("Network Error") ||
			error?.message?.includes("timeout")
		);
	}

	static isAuthError(error: any): boolean {
		return error?.response?.status === 401 || error?.response?.status === 403;
	}

	static isValidationError(error: any): boolean {
		return error?.response?.status === 400;
	}
}

