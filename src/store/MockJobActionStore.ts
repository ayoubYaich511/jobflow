// Mock job action store to replace the original MobX store
import {
	CommonJobAdLocationRo,
	CommonUserSuggestedStartDateDto,
	JobAdApplyScreenRo,
} from "@/types";

export class MockJobActionStore {
	private shouldOpenMinimumAgeModal: boolean = false;
	private shouldOpenCoverLetterModal: boolean = false;
	private shouldOpenParentConsentModal: boolean = false;
	private shouldOpenSuccessModal: boolean = false;
	private applyData: any = null;
	private coverLetterQuestions: string[] = [];
	private privacyLinks: string | null = null;
	private qualificationQuestions: any[] = [];
	private selectedLocations: CommonJobAdLocationRo[] = [];

	setShouldOpenMinimumAgeModal(value: boolean): void {
		this.shouldOpenMinimumAgeModal = value;
	}

	get shouldOpenMinimumAgeModalValue(): boolean {
		return this.shouldOpenMinimumAgeModal;
	}

	setShouldOpenCoverLetterModal(value: boolean): void {
		this.shouldOpenCoverLetterModal = value;
	}

	get shouldOpenCoverLetterModalValue(): boolean {
		return this.shouldOpenCoverLetterModal;
	}

	setShouldOpenParentConsentModal(value: boolean): void {
		this.shouldOpenParentConsentModal = value;
	}

	get shouldOpenParentConsentModalValue(): boolean {
		return this.shouldOpenParentConsentModal;
	}

	setShouldOpenSuccessModal(value: boolean): void {
		this.shouldOpenSuccessModal = value;
	}

	get shouldOpenSuccessModalValue(): boolean {
		return this.shouldOpenSuccessModal;
	}

	setApplyData(data: any): void {
		this.applyData = data;
	}

	getApplyData(): any {
		return this.applyData;
	}

	setCoverLetterQuestions(questions: string[]): void {
		this.coverLetterQuestions = questions;
	}

	getCoverLetterQuestions(): string[] {
		return this.coverLetterQuestions;
	}

	setPrivacyLinks(links: string | null): void {
		this.privacyLinks = links;
	}

	getPrivacyLinks(): string | null {
		return this.privacyLinks;
	}

	setQualificationQuestions(questions: any[]): void {
		this.qualificationQuestions = questions;
	}

	getQualificationQuestions(): any[] {
		return this.qualificationQuestions;
	}

	setSelectedLocations(locations: CommonJobAdLocationRo[]): void {
		this.selectedLocations = locations;
	}

	getSelectedLocations(): CommonJobAdLocationRo[] {
		return this.selectedLocations;
	}

	// Mock API methods
	async applyExternal(params: {
		jobAdId: string;
		appliedFrom: string;
		referredFrom: string;
		coverLetterGeneratorUsageCount: number;
	}): Promise<{ candidate: { id: string } }> {
		console.log("Mock JobActionStore: applyExternal called with", params);
		return {
			candidate: { id: "mock-candidate-id" },
		};
	}

	async apply(params: {
		jobAdId: string;
		selectedLocations: CommonJobAdLocationRo[];
		qualificationQuestions?: any[];
		coverLetter?: string;
	}): Promise<any> {
		console.log("Mock JobActionStore: apply called with", params);
		return { success: true };
	}

	async saveJob(params: {
		jobAdId: string;
	}): Promise<JobAdApplyScreenRo | null> {
		console.log("Mock JobActionStore: saveJob called with", params);
		return null;
	}

	async unsaveJob(params: { jobAdId: string }): Promise<void> {
		console.log("Mock JobActionStore: unsaveJob called with", params);
	}

	async shareJob(params: { jobAdId: string }): Promise<void> {
		console.log("Mock JobActionStore: shareJob called with", params);
	}

	async markAsViewed(params: { jobAdId: string }): Promise<void> {
		console.log("Mock JobActionStore: markAsViewed called with", params);
	}

	async withdrawApplication(params: { jobAdId: string }): Promise<void> {
		console.log("Mock JobActionStore: withdrawApplication called with", params);
	}

	setInitialState(): void {
		console.log("Mock JobActionStore: setInitialState called");
		this.shouldOpenMinimumAgeModal = false;
		this.shouldOpenCoverLetterModal = false;
		this.shouldOpenParentConsentModal = false;
		this.shouldOpenSuccessModal = false;
		this.applyData = null;
		this.coverLetterQuestions = [];
		this.privacyLinks = null;
		this.qualificationQuestions = [];
		this.selectedLocations = [];
	}
}

