// Mock hook to replace useCvWizard
import { useState } from "react";

export const useCvWizard = () => {
	const [currentStep, setCurrentStep] = useState(1);
	const [totalSteps, setTotalSteps] = useState(1);

	const processCvWizardSteps = async (
		steps: any[],
		options: { fromApplyFlow?: boolean } = {},
	) => {
		console.log(
			"Mock useCvWizard: processCvWizardSteps called with",
			steps,
			options,
		);

		if (steps.length > 0) {
			setTotalSteps(steps.length);
			// Mock navigation to CV wizard
			console.log(
				"Mock useCvWizard: Navigating to CV wizard with steps:",
				steps,
			);
		}
	};

	const nextStep = () => {
		if (currentStep < totalSteps) {
			setCurrentStep(currentStep + 1);
			console.log(
				"Mock useCvWizard: nextStep called, current step:",
				currentStep + 1,
			);
		}
	};

	const previousStep = () => {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1);
			console.log(
				"Mock useCvWizard: previousStep called, current step:",
				currentStep - 1,
			);
		}
	};

	const resetWizard = () => {
		setCurrentStep(1);
		setTotalSteps(1);
		console.log("Mock useCvWizard: resetWizard called");
	};

	return {
		currentStep,
		totalSteps,
		processCvWizardSteps,
		nextStep,
		previousStep,
		resetWizard,
	};
};

