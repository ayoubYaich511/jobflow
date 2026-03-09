// Mock app store to replace the original MobX store
import { JobAdApplyScreenRo } from "@/types";

export class MockAppStore {
	private currentApplyState: any = null;
	private currentFromNavigationApplyState: any = null;
	private currentChatState: any = null;

	setCurrentApplyState(state: any): void {
		this.currentApplyState = state;
		console.log("Mock AppStore: setCurrentApplyState called with", state);
	}

	getCurrentApplyState(): any {
		return this.currentApplyState;
	}

	setCurrentFromNavigationApplyState(state: any): void {
		this.currentFromNavigationApplyState = state;
		console.log(
			"Mock AppStore: setCurrentFromNavigationApplyState called with",
			state,
		);
	}

	getCurrentFromNavigationApplyState(): any {
		return this.currentFromNavigationApplyState;
	}

	setCurrentChatState(state: any): void {
		this.currentChatState = state;
		console.log("Mock AppStore: setCurrentChatState called with", state);
	}

	getCurrentChatState(): any {
		return this.currentChatState;
	}
}

