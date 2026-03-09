// Common enums and types used throughout the app

export enum CommonEmploymentType {
	FULL_TIME = "FULL_TIME",
	PART_TIME = "PART_TIME",
	MINIJOB = "MINIJOB",
	INTERNSHIP = "INTERNSHIP",
	WORKING_STUDENT = "WORKING_STUDENT",
	TEMPORARY_CONTRACT = "TEMPORARY_CONTRACT",
	PERMANENT_EMPLOYMENT = "PERMANENT_EMPLOYMENT",
	TRAINING = "TRAINING",
	HOLIDAY_JOB = "HOLIDAY_JOB",
	MILITARY_CIVIL_SERVICE_VOLUNTARY_YEAR = "MILITARY_CIVIL_SERVICE_VOLUNTARY_YEAR",
	DUAL_STUDY = "DUAL_STUDY",
	ENTRY_POSITION = "ENTRY_POSITION",
	OTHER = "OTHER",
}

export enum CommonWorkplaceType {
	ON_SITE = "ON_SITE",
	HYBRID = "HYBRID",
	REMOTE = "REMOTE",
}

export enum CommonClientAdditionalDocumentType {
	SCHOOL_CERTIFICATE = "SCHOOL_CERTIFICATE",
	CV = "CV",
	COVER_LETTER = "COVER_LETTER",
	OTHER = "OTHER",
}

export enum PersonalDataProcessingPermissionKey {
	PROCESS_DATA = "PROCESS_DATA",
	USE_AI = "USE_AI",
	SHARE_DATA = "SHARE_DATA",
}

export enum PersonalDataProcessingPermissionType {
	REQUIRED = "REQUIRED",
	RECOMMENDED = "RECOMMENDED",
	OPTIONAL = "OPTIONAL",
}

export interface CommonJobAdLocationRo {
	id: string;
	name: string;
	address: string;
	postalCode: string;
	city: string;
	country: string;
	latitude?: number;
	longitude?: number;
	contactPerson?: {
		id: string;
		name: string;
		email: string;
		phone?: string;
	} | null;
	jobPostingUrl?: string | null;
	locationType: "saved" | "plain";
	recruiterId?: string | null;
	savedLocationId?: string;
	startDate?: {
		startDay: number;
		startMonth: number;
	} | null;
}

export interface CommonUserSuggestedStartDateDto {
	startDay: number;
	startMonth: number;
	startYear?: number;
}

export interface CommonJobAdQualificationQuestionRo {
	id: string;
	question: string;
	isRequired: boolean;
	options?: string[];
	type: "text" | "multiple_choice" | "yes_no";
}

export interface CommonJobInteractionSettingsRo {
	allowChat: boolean;
	allowApply: boolean;
	allowSave: boolean;
	allowShare: boolean;
}

export interface CommonJobAdRedirectSettingsRo {
	isRedirected: boolean;
	redirectUrl?: string;
	externalApplyUrl?: string;
}

export interface CommonJobAdTag {
	id: string;
	name: string;
	color: string;
}

export interface CommonLocationRo {
	id: string;
	name: string;
	address: string;
	postalCode: string;
	city: string;
	country: string;
	latitude?: number;
	longitude?: number;
}

