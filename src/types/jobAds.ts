import { AppliedFrom, OpenedFrom } from "./analytics";
import {
	CommonEmploymentType,
	CommonJobAdLocationRo,
	CommonJobAdQualificationQuestionRo,
	CommonJobAdRedirectSettingsRo,
	CommonJobInteractionSettingsRo,
	CommonUserSuggestedStartDateDto,
} from "./common";

export enum UserJobAdStatus {
	DEFAULT = "DEFAULT",
	VIEWED = "VIEWED",
	BOOKMARKED = "BOOKMARKED",
	IN_CHAT = "IN_CHAT",
	APPLIED = "APPLIED",
	REJECTED = "REJECTED",
	WITHDRAWN = "WITHDRAWN",
}

export interface CompanySimpleRo {
	id: string;
	name: string;
	logoImg?: {
		variants: {
			min_dim_128_url: string;
		};
	} | null;
	privacyLinks?: {
		content: string;
	} | null;
}

export interface JobGroupWithoutUserInfoRo {
	id: string;
	name: string;
	type: string;
}

export interface SubsidiarySimpleRo {
	id: string;
	name: string;
	companyId: string;
}

export interface JobAdChatInfoRo {
	conversationId?: string;
	isActive: boolean;
	lastMessageAt?: Date;
	unreadCount: number;
}

export interface JobAdApplyScreenRo {
	id: string;
	externalName: string;
	employmentTypes: CommonEmploymentType[];
	qualificationQuestions: CommonJobAdQualificationQuestionRo[] | null;
	locations: CommonJobAdLocationRo[];
	interactionSettings: CommonJobInteractionSettingsRo;
	company: CompanySimpleRo;
	jobGroup: JobGroupWithoutUserInfoRo | null;
	onlyAllowSingleLocationSelect: boolean;
	appliedInfo: {
		millis: number;
		selectedLocations: Array<{
			locationId: string;
			name: string;
		}>;
	} | null;
	savedInfo: {
		millis: number;
	} | null;
	viewedInfo: {
		millis: number;
	} | null;
	status: UserJobAdStatus;
	chatInfo: JobAdChatInfoRo;
	redirectSettings: CommonJobAdRedirectSettingsRo;
	waitingForReapplySince: Date | null;
	minimumAge: number | null;
	startDate?: Date | null;
	requireSchoolReport: boolean;
	waitingForParentConsentConfirmation: boolean;
	subsidiary: SubsidiarySimpleRo | null;
}

export interface JobAdRo extends JobAdApplyScreenRo {
	// Additional fields for the full job ad
	caption: string;
	createdAt: Date;
	candidateProfileTitle: string;
	candidateProfileDescription: string;
	applicationProcess?: string;
	ourOfferTitle: string;
	ourOfferDescription: string;
	yourTasksTitle: string;
	yourTasksDescription: string;
	fullDescription: string | null;
	salaryAskInChat: boolean;
	workPlaceType: string;
	homeScreenTags: Array<{ id: string; name: string; color: string }>;
	jobDetailsTags: Array<{ id: string; name: string; color: string }>;
	requiredSkills: Array<{ id: string; name: string }>;
	requiredLanguages: Array<{ id: string; name: string; level: string }>;
	ourOfferBenefits: Array<{ id: string; name: string; description: string }>;
	salary?: {
		from: number;
		to?: number;
		currency: string;
		type: string;
	} | null;
	duration?: {
		fromAmount: number;
		toAmount: number | null;
	} | null;
	isActive: boolean;
	deactivationReasons: string[];
	teamId: string;
	minimumRecommendedSchoolDegree: string | null;
	openForCareerChangers?: boolean;
	homeOfficeType?: string;
	workingHoursType?: string;
}

export interface JobAdQualificationQuestionsAndAnswersRo {
	questions: CommonJobAdQualificationQuestionRo[];
	answers: Array<{
		questionId: string;
		answer: string | string[];
	}>;
	hasAcceptedCustomPrivacyPolicy: boolean;
}

