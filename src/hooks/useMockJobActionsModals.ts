// Mock hook to replace useJobActionsModals
import { useState } from "react";
import { ActionSourceEnum, JobAdRo } from "@/types";

export const useJobActionsModals = () => {
	const [isVisibleCreateChoice, setIsVisibleCreateChoice] = useState(false);

	const trySaveJob = async (
		info: { job: Pick<JobAdRo, "id" | "savedInfo"> },
		savedFrom: ActionSourceEnum,
	): Promise<JobAdRo | null> => {
		console.log(
			"Mock useJobActionsModals: trySaveJob called with",
			info,
			savedFrom,
		);
		// Mock implementation - return null to indicate success
		return null;
	};

	const setPathname = (): void => {
		console.log("Mock useJobActionsModals: setPathname called");
	};

	const tryShareJob = (
		info: { job: Pick<JobAdRo, "id" | "company"> },
		sharedFrom: ActionSourceEnum,
	): void => {
		console.log(
			"Mock useJobActionsModals: tryShareJob called with",
			info,
			sharedFrom,
		);
	};

	const tryMarkJobAsViewed = (info: { job: JobAdRo }): void => {
		console.log(
			"Mock useJobActionsModals: tryMarkJobAsViewed called with",
			info,
		);
	};

	const tryStartChatWithJob = async (info: {
		job: Pick<JobAdRo, "id" | "chatInfo" | "company" | "interactionSettings">;
		hasAddedCv?: boolean;
		referredFrom: any;
	}): Promise<void> => {
		console.log(
			"Mock useJobActionsModals: tryStartChatWithJob called with",
			info,
		);
	};

	const tryWithdrawApplication = (info: {
		job: JobAdRo;
		withdrawFrom: any;
		referredFrom: any;
	}): void => {
		console.log(
			"Mock useJobActionsModals: tryWithdrawApplication called with",
			info,
		);
	};

	const openNotificationPermissionModal = async (): Promise<void> => {
		console.log(
			"Mock useJobActionsModals: openNotificationPermissionModal called",
		);
	};

	return {
		trySaveJob,
		setPathname,
		tryShareJob,
		tryMarkJobAsViewed,
		tryStartChatWithJob,
		tryWithdrawApplication,
		isVisibleCreateChoice,
		setIsVisibleCreateChoice,
		openNotificationPermissionModal,
	};
};

