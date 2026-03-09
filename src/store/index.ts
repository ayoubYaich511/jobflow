// Create singleton instances
import { MockAppStore } from "./MockAppStore";
import { MockJobActionStore } from "./MockJobActionStore";
import { MockJobSearchStore } from "./MockJobSearchStore";
import { MockJobsStore } from "./MockJobsStore";

// Export all mock stores
export * from "./MockJobActionStore";
export * from "./MockAppStore";
export * from "./MockJobsStore";
export * from "./MockJobSearchStore";

export const mockJobActionStore = new MockJobActionStore();
export const mockAppStore = new MockAppStore();
export const mockJobsStore = new MockJobsStore();
export const mockJobSearchStore = new MockJobSearchStore();

// Mock useStore hook
export const useStore = () => ({
	jobActionStore: mockJobActionStore,
	appStore: mockAppStore,
	jobsStore: mockJobsStore,
	jobSearchStore: mockJobSearchStore,
});

