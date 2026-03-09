import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { CommonJobAdLocationRo, JobAdApplyScreenRo } from "@/types";

interface ApplyModalProps {
	job: JobAdApplyScreenRo;
	isVisible: boolean;
	selectedLocations: CommonJobAdLocationRo[];
	setIsVisible: (visible: boolean) => void;
	onAfterApply: (data: { qualificationQuestions?: any[] }) => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
	job,
	isVisible,
	selectedLocations,
	setIsVisible,
	onAfterApply,
}) => {
	if (!isVisible) return null;

	const handleApply = () => {
		console.log("ApplyModal: Apply button pressed");
		onAfterApply({
			qualificationQuestions: job.qualificationQuestions,
		});
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Apply to {job.externalName}</Text>
			<Text style={styles.company}>{job.company.name}</Text>

			<ScrollView style={styles.content}>
				<Text style={styles.sectionTitle}>Selected Locations:</Text>
				{selectedLocations.map((location, index) => (
					<Text key={index} style={styles.locationText}>
						• {location.name}, {location.city}
					</Text>
				))}

				<Text style={styles.sectionTitle}>Employment Types:</Text>
				{job.employmentTypes.map((type, index) => (
					<Text key={index} style={styles.employmentText}>
						• {type}
					</Text>
				))}
			</ScrollView>

			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.cancelButton}
					onPress={() => setIsVisible(false)}
				>
					<Text style={styles.cancelButtonText}>Cancel</Text>
				</TouchableOpacity>

				<TouchableOpacity style={styles.applyButton} onPress={handleApply}>
					<Text style={styles.applyButtonText}>Apply</Text>
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
	},
	title: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 8,
	},
	company: {
		fontSize: 18,
		color: "#666",
		marginBottom: 20,
	},
	content: {
		flex: 1,
		marginBottom: 20,
	},
	sectionTitle: {
		fontSize: 16,
		fontWeight: "600",
		color: "#333",
		marginTop: 16,
		marginBottom: 8,
	},
	locationText: {
		fontSize: 14,
		color: "#666",
		marginBottom: 4,
	},
	employmentText: {
		fontSize: 14,
		color: "#666",
		marginBottom: 4,
	},
	buttonContainer: {
		flexDirection: "row",
		gap: 12,
	},
	cancelButton: {
		flex: 1,
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#007AFF",
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	cancelButtonText: {
		color: "#007AFF",
		fontSize: 16,
		fontWeight: "600",
	},
	applyButton: {
		flex: 1,
		backgroundColor: "#007AFF",
		paddingVertical: 12,
		borderRadius: 8,
		alignItems: "center",
	},
	applyButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});

