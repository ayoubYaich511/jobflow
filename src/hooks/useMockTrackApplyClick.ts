// Mock hook to replace useTrackApplyClickMutation
import { useState } from "react";

export const useTrackApplyClickMutation = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<any>(null);

	const mutate = async (params: { jobAdId: string }) => {
		console.log("Mock useTrackApplyClickMutation: mutate called with", params);

		setIsLoading(true);
		setError(null);

		try {
			// Mock API call
			await new Promise((resolve) => setTimeout(resolve, 500));

			console.log(
				"Mock useTrackApplyClickMutation: Apply click tracked successfully",
			);
		} catch (err) {
			console.error(
				"Mock useTrackApplyClickMutation: Error tracking apply click",
				err,
			);
			setError(err);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		mutate,
		isLoading,
		error,
	};
};

