// Mock API service to replace vanillaApi from the original
import {
	JobAdApplyScreenRo,
	JobAdQualificationQuestionsAndAnswersRo,
} from "@/types";

export class MockApiService {
	// Mock CV Wizard API
	cvWizard = {
		getJobAdOnboardingSteps: {
			query: async (params: { jobAdId: string }): Promise<any[]> => {
				// Mock response - return empty array to simulate no steps needed
				console.log("Mock API: getJobAdOnboardingSteps called with", params);
				return [];
			},
		},
	};

	// Mock Candidate API
	candidate = {
		draftCustomQuestionToGenerateCoverLetter: {
			query: async (params: {
				jobAdId: string;
				language: string;
			}): Promise<string[] | null> => {
				console.log(
					"Mock API: draftCustomQuestionToGenerateCoverLetter called with",
					params,
				);
				// Mock response - return some sample questions
				return [
					"Why are you interested in this position?",
					"What relevant experience do you have?",
					"What are your career goals?",
				];
			},
		},
	};

	// Mock Job Actions API
	jobActions = {
		applyExternal: async (params: {
			jobAdId: string;
			appliedFrom: string;
			referredFrom: string;
			coverLetterGeneratorUsageCount: number;
		}): Promise<{ candidate: { id: string } }> => {
			console.log("Mock API: applyExternal called with", params);
			return {
				candidate: { id: "mock-candidate-id" },
			};
		},

		apply: async (params: {
			jobAdId: string;
			selectedLocations: any[];
			qualificationQuestions?: any[];
			coverLetter?: string;
		}): Promise<JobAdQualificationQuestionsAndAnswersRo> => {
			console.log("Mock API: apply called with", params);
			return {
				questions: [],
				answers: [],
				hasAcceptedCustomPrivacyPolicy: true,
			};
		},

		saveJob: async (params: {
			jobAdId: string;
		}): Promise<JobAdApplyScreenRo | null> => {
			console.log("Mock API: saveJob called with", params);
			return null; // Mock - return null to indicate success
		},

		unsaveJob: async (params: { jobAdId: string }): Promise<void> => {
			console.log("Mock API: unsaveJob called with", params);
		},

		shareJob: async (params: { jobAdId: string }): Promise<void> => {
			console.log("Mock API: shareJob called with", params);
		},

		markAsViewed: async (params: { jobAdId: string }): Promise<void> => {
			console.log("Mock API: markAsViewed called with", params);
		},

		withdrawApplication: async (params: { jobAdId: string }): Promise<void> => {
			console.log("Mock API: withdrawApplication called with", params);
		},
	};

	// Mock User API
	user = {
		getAuthenticatedUser: {
			query: async (): Promise<any> => {
				console.log("Mock API: getAuthenticatedUser called");
				return {
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
						completedSteps: ["profile", "skills"],
					},
					additionalDocuments: [],
					isTempUser: false,
				};
			},
		},
	};
}

// Create singleton instance
export const mockApiService = new MockApiService();

