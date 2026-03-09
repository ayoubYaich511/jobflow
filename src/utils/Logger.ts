// Logger utility
export class Logger {
	static info(params: { message: string; data?: any }): void {
		console.log(
			`[INFO] ${params.message}`,
			params.data ? JSON.stringify(params.data, null, 2) : "",
		);
	}

	static error(params: { message: string; error?: any }): void {
		console.error(
			`[ERROR] ${params.message}`,
			params.error ? JSON.stringify(params.error, null, 2) : "",
		);
	}

	static warn(params: { message: string; data?: any }): void {
		console.warn(
			`[WARN] ${params.message}`,
			params.data ? JSON.stringify(params.data, null, 2) : "",
		);
	}

	static debug(params: { message: string; data?: any }): void {
		console.debug(
			`[DEBUG] ${params.message}`,
			params.data ? JSON.stringify(params.data, null, 2) : "",
		);
	}

	static log(message: string, data?: any): void {
		console.log(`[LOG] ${message}`, data ? JSON.stringify(data, null, 2) : "");
	}
}

