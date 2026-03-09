import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { JobAdApplyScreenRo } from "@/types";

interface AppliedSuccessProps {
	job: JobAdApplyScreenRo;
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	onClose: () => void;
}

export const AppliedSuccess: React.FC<AppliedSuccessProps> = ({
	job,
	isVisible,
	setIsVisible,
	onClose,
}) => {
	if (!isVisible) return null;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Application Submitted! 🎉</Text>
			<Text style={styles.description}>
				Your application for {job.externalName} at {job.company.name} has been
				submitted successfully.
			</Text>
			<Text style={styles.subDescription}>
				You will receive a confirmation email shortly. The company will review
				your application and get back to you.
			</Text>

			<TouchableOpacity style={styles.button} onPress={onClose}>
				<Text style={styles.buttonText}>Continue</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	title: {
		fontSize: 28,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 16,
		textAlign: "center",
	},
	description: {
		fontSize: 18,
		color: "#666",
		textAlign: "center",
		lineHeight: 24,
		marginBottom: 12,
	},
	subDescription: {
		fontSize: 16,
		color: "#888",
		textAlign: "center",
		lineHeight: 22,
		marginBottom: 32,
	},
	button: {
		backgroundColor: "#007AFF",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
	},
	buttonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});

