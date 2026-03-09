// User-related types

export interface UserOnboardingStatus {
	isCompleted: boolean;
	completedSteps: string[];
	currentStep?: string;
}

export interface UserBirthDate {
	year: number;
	month: number;
	day: number;
}

export interface UserAdditionalDocument {
	id: string;
	type: string;
	name: string;
	url?: string;
	uploadedAt: Date;
}

export interface AuthenticatedUser {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	birthDate?: UserBirthDate;
	onboardingStatus: UserOnboardingStatus;
	additionalDocuments: UserAdditionalDocument[];
	isTempUser: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export interface UserProfile {
	id: string;
	userId: string;
	bio?: string;
	skills: string[];
	languages: Array<{
		language: string;
		level: string;
	}>;
	workExperience: Array<{
		id: string;
		company: string;
		position: string;
		startDate: Date;
		endDate?: Date;
		description?: string;
	}>;
	education: Array<{
		id: string;
		institution: string;
		degree: string;
		fieldOfStudy: string;
		startDate: Date;
		endDate?: Date;
	}>;
}

