// Mock hook to replace useAuthenticationFlow
import { useState } from "react";

export const useAuthenticationFlow = () => {
	const [authProviderApplyCurrentlyState, setAuthProviderApplyCurrentlyState] =
		useState<any>(null);
	const [authProviderChatCurrentState, setAuthProviderChatCurrentState] =
		useState<any>(null);

	const setAuthProviderApplyCurrentlyStateHandler = (state: any) => {
		setAuthProviderApplyCurrentlyState(state);
		console.log(
			"Mock useAuthenticationFlow: setAuthProviderApplyCurrentlyState called with",
			state,
		);
	};

	const setAuthProviderChatCurrentStateHandler = (state: any) => {
		setAuthProviderChatCurrentState(state);
		console.log(
			"Mock useAuthenticationFlow: setAuthProviderChatCurrentState called with",
			state,
		);
	};

	return {
		setAuthProviderApplyCurrentlyState:
			setAuthProviderApplyCurrentlyStateHandler,
		setAuthProviderChatCurrentState: setAuthProviderChatCurrentStateHandler,
		authProviderApplyCurrentlyState,
		authProviderChatCurrentState,
	};
};

