// Mock navigation and routing service
import { Linking } from "react-native";

export class MockRouter {
	private currentPath: string = "/";

	push(path: string): void {
		console.log("Mock Router: push to", path);
		this.currentPath = path;
	}

	replace(path: string): void {
		console.log("Mock Router: replace with", path);
		this.currentPath = path;
	}

	back(): void {
		console.log("Mock Router: back");
	}

	canDismiss(): boolean {
		console.log("Mock Router: canDismiss");
		return true;
	}

	dismissAll(): void {
		console.log("Mock Router: dismissAll");
	}

	getCurrentPath(): string {
		return this.currentPath;
	}
}

export class MockLinkUtils {
	static async openLink(url: string): Promise<void> {
		console.log("Mock LinkUtils: openLink called with", url);
		try {
			await Linking.openURL(url);
		} catch (error) {
			console.error("Mock LinkUtils: Failed to open link", error);
		}
	}
}

export class MockAppLinkUtils {
	static getCvWizardPathUnskippable(params: {}): string {
		console.log("Mock AppLinkUtils: getCvWizardPathUnskippable called");
		return "/cv-wizard";
	}

	static getUpdateQualificationQuestionsPath(params: {
		companyName: string;
		jobAdId: string;
	}): string {
		console.log(
			"Mock AppLinkUtils: getUpdateQualificationQuestionsPath called with",
			params,
		);
		return `/qualification-questions/${params.jobAdId}`;
	}

	static getCoverLetterQuestionsPath(params: {
		companyName: string;
		jobAdId: string;
		noAi?: boolean;
	}): string {
		console.log(
			"Mock AppLinkUtils: getCoverLetterQuestionsPath called with",
			params,
		);
		return `/cover-letter-questions/${params.jobAdId}`;
	}

	static getQualificationQuestionsPath(params: {
		companyName: string;
		jobAdId: string;
	}): string {
		console.log(
			"Mock AppLinkUtils: getQualificationQuestionsPath called with",
			params,
		);
		return `/qualification-questions/${params.jobAdId}`;
	}
}

