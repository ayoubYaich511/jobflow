// Mock hook to replace userHooks
import { useEffect, useState } from "react";
import { AuthenticatedUser } from "@/types";

export const useMockUserHooks = () => {
	const [user, setUser] = useState<AuthenticatedUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Mock user data loading
		const loadUser = async () => {
			setIsLoading(true);

			// Simulate API call
			setTimeout(() => {
				const mockUser: AuthenticatedUser = {
					id: "mock-user-id",
					email: "test@example.com",
					firstName: "John",
					lastName: "Doe",
					birthDate: {
						year: 2000,
						month: 1,
						day: 1,
					},
					onboardingStatus: {
						isCompleted: true,
						completedSteps: ["profile", "skills", "experience"],
					},
					additionalDocuments: [
						{
							id: "doc-1",
							type: "CV",
							name: "My CV.pdf",
							uploadedAt: new Date(),
						},
					],
					isTempUser: false,
					createdAt: new Date(),
					updatedAt: new Date(),
				};

				setUser(mockUser);
				setIsLoading(false);
			}, 1000);
		};

		loadUser();
	}, []);

	return {
		useGetAuthenticatedUserQuery: () => ({
			data: user,
			isLoading,
			error: null,
		}),
	};
};

export const userHooks = useMockUserHooks();

