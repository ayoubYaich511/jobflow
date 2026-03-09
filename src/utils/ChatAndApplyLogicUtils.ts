// Chat and apply logic utilities
import { AuthenticatedUser, JobAdApplyScreenRo } from "@/types";

// Import DateUtils for the needsParentConsent method
import { DateUtils } from "./DateUtils";

export type ApplyState =
	| "applied"
	| "incomplete-qualification-questions"
	| "can-apply"
	| "can-apply-after-create-account"
	| "can-apply-after-finish-profile";

export class ChatAndApplyLogicUtils {
	static getApplyInfo({
		jobAd,
		user,
	}: {
		jobAd: JobAdApplyScreenRo;
		user: AuthenticatedUser;
	}): ApplyState {
		console.log("ChatAndApplyLogicUtils: getApplyInfo called with", {
			jobAd: jobAd.id,
			user: user.id,
		});

		// Check if already applied
		if (jobAd.appliedInfo) {
			return "applied";
		}

		// Check if user needs to complete qualification questions
		if (
			jobAd.qualificationQuestions &&
			jobAd.qualificationQuestions.length > 0
		) {
			// Mock check - assume user hasn't completed qualification questions
			return "incomplete-qualification-questions";
		}

		// Check if user needs to create account
		if (user.isTempUser) {
			return "can-apply-after-create-account";
		}

		// Check if user needs to finish profile
		if (!user.onboardingStatus.isCompleted) {
			return "can-apply-after-finish-profile";
		}

		// User can apply
		return "can-apply";
	}

	static canUserApply(
		jobAd: JobAdApplyScreenRo,
		user: AuthenticatedUser,
	): boolean {
		const applyState = this.getApplyInfo({ jobAd, user });
		return applyState === "can-apply";
	}

	static needsQualificationQuestions(jobAd: JobAdApplyScreenRo): boolean {
		return Boolean(
			jobAd.qualificationQuestions && jobAd.qualificationQuestions.length > 0,
		);
	}

	static needsParentConsent(
		jobAd: JobAdApplyScreenRo,
		user: AuthenticatedUser,
	): boolean {
		if (!user.birthDate || !jobAd.minimumAge || !jobAd.startDate) {
			return false;
		}

		const birthDate = new Date(
			user.birthDate.year,
			user.birthDate.month,
			user.birthDate.day,
		);
		const age = DateUtils.getAge(birthDate, new Date(jobAd.startDate));

		return age < jobAd.minimumAge;
	}

	static needsSchoolReport(
		jobAd: JobAdApplyScreenRo,
		user: AuthenticatedUser,
	): boolean {
		return (
			jobAd.requireSchoolReport &&
			!user.additionalDocuments.some((doc) => doc.type === "SCHOOL_CERTIFICATE")
		);
	}
}
