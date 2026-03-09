import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { JobAdApplyScreenRo } from "@/types";

interface ExternalApplyReportModalProps {
	job: JobAdApplyScreenRo;
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	onApplied: () => void;
	onDidNotApply: () => void;
}

export const ExternalApplyReportModal: React.FC<
	ExternalApplyReportModalProps
> = ({ job, isVisible, setIsVisible, onApplied, onDidNotApply }) => {
	if (!isVisible) return null;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>How did it go?</Text>
			<Text style={styles.description}>
				Did you successfully apply for {job.externalName} at {job.company.name}?
			</Text>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={[styles.button, styles.successButton]}
					onPress={onApplied}
				>
					<Text style={styles.successButtonText}>Yes, I applied</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={[styles.button, styles.cancelButton]}
					onPress={onDidNotApply}
				>
					<Text style={styles.cancelButtonText}>No, I didn't apply</Text>
				</TouchableOpacity>
			</View>
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
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 16,
		textAlign: "center",
	},
	description: {
		fontSize: 16,
		color: "#666",
		textAlign: "center",
		lineHeight: 22,
		marginBottom: 32,
	},
	buttonContainer: {
		width: "100%",
		gap: 12,
	},
	button: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: "center",
	},
	successButton: {
		backgroundColor: "#34C759",
	},
	successButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	cancelButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#FF3B30",
	},
	cancelButtonText: {
		color: "#FF3B30",
		fontSize: 16,
		fontWeight: "600",
	},
});

