// Mock tracking services to replace PosthogService, AdjustService, TrackingService

export class MockPosthogService {
	static checkReportCardEnabled(posthog: any): string | null {
		console.log("Mock PosthogService: checkReportCardEnabled called");
		// Mock feature flag check
		return "optional"; // or 'required_to_apply' or null
	}
}

export class MockAdjustService {
	static trackEvent(params: {
		eventToken: string;
		payload: Record<string, any>;
	}): void {
		console.log("Mock AdjustService: trackEvent called with", params);
	}
}

export class MockTrackingService {
	static captureEvent(posthog: any, event: any): void {
		console.log("Mock TrackingService: captureEvent called with", event);
	}
}

export class MockSentryService {
	static captureException(error: any): void {
		console.log("Mock Sentry: captureException called with", error);
	}
}

export class MockLogger {
	static info(params: { message: string; data?: any }): void {
		console.log("Mock Logger Info:", params.message, params.data);
	}

	static error(params: { message: string; error?: any }): void {
		console.error("Mock Logger Error:", params.message, params.error);
	}
}

export class MockToastService {
	static show(params: {
		type: "success" | "error" | "info";
		text1: string;
		text2?: string;
	}): void {
		console.log("Mock Toast:", params.type, params.text1, params.text2);
	}
}

