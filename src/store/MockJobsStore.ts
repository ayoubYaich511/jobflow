// Mock jobs store
export class MockJobsStore {
	private jobs: any[] = [];

	getJobs(): any[] {
		return this.jobs;
	}

	setJobs(jobs: any[]): void {
		this.jobs = jobs;
		console.log("Mock JobsStore: setJobs called with", jobs.length, "jobs");
	}

	addJob(job: any): void {
		this.jobs.push(job);
		console.log("Mock JobsStore: addJob called with", job);
	}

	removeJob(jobId: string): void {
		this.jobs = this.jobs.filter((job) => job.id !== jobId);
		console.log("Mock JobsStore: removeJob called with", jobId);
	}

	updateJob(jobId: string, updates: any): void {
		const jobIndex = this.jobs.findIndex((job) => job.id === jobId);
		if (jobIndex !== -1) {
			this.jobs[jobIndex] = { ...this.jobs[jobIndex], ...updates };
			console.log("Mock JobsStore: updateJob called with", jobId, updates);
		}
	}
}

