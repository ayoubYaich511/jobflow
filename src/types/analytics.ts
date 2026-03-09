// Analytics and tracking types

export enum AppliedFrom {
	JOB_DETAILS = "job_details",
	JOB_MAP_DETAILS = "job_map_details",
	SAVED = "saved",
	CHAT = "chat",
	MY_JOBFLOW = "my_jobflow",
	MATCH_LIKE_CHAT = "match_like_chat",
}

export enum OpenedFrom {
	JOB_MAP = "job_map",
	FEED = "feed",
	DIRECT = "direct",
	SAVED = "saved",
	CHAT = "chat",
	APPLIED = "applied",
	COMPANY = "company",
	MY_JOBS = "my_jobs",
	MY_JOBFLOW = "my_jobflow",
	JOB_DETAILS = "job_details",
	TOP_JOB_ADS = "top_job_ads",
	REAPPLY_NOTIFICATION = "reapply_notification",
	NEW_MESSAGE_NOTIFICATION = "new_message_notification",
	SIMILAR_JOBS = "similar_jobs",
	MATCH_LIKE_CHAT = "match_like_chat",
	INTERVIEW_DETAILS = "interview_details",
	CONVERSATIONS_NEED_ATTENTION = "conversations_need_attention",
}

export enum ActionSourceEnum {
	FEED = "feed",
	FEED_DETAILS = "feed_details",
	JOB_MAP_HALF_DETAILS = "job_map_half_details",
	JOB_MAP_DETAILS = "job_map_details",
	GREAT_CHOICE_MODAL = "great-choice-modal",
	MY_JOBS = "my_jobs",
	DIRECT = "direct",
	SIMILAR_JOBS = "similar_jobs",
	CHAT = "chat",
}

export enum CoverLetterGenerationSource {
	CREATE_COVER_LETTER_MODAL = "createCoverLetterModal",
	MANUAL = "manual",
}

export interface ClientEvent {
	eventName: string;
	payload: Record<string, any>;
}

export interface ApplyEventRawProperties {
	jobId: string;
	jobTitle: string;
	jobLocation?: string;
	locationsCount?: number;
	companyName: string;
	companyId: string;
	companyLevel: string;
	isSignupApply: boolean;
	isFirstApply?: boolean;
	appliedFrom?: AppliedFrom;
	jobGroupType?: string | null;
	jobGroupName?: string | null;
	coverLetterGeneratorUsageCount?: number;
	includedReportCard: boolean;
	referredFrom: OpenedFrom;
	externalApply?: boolean;
	featureFlags?: Record<string, boolean | string | number>;
	activeFeatureFlags?: Record<
		string,
		{
			value: boolean | string | number;
			isEnabled: boolean;
		}
	>;
}

