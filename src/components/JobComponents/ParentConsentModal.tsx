import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ParentConsentModalProps {
	isVisible: boolean;
	onClose: () => void;
}

export const ParentConsentModal: React.FC<ParentConsentModalProps> = ({
	isVisible,
	onClose,
}) => {
	if (!isVisible) return null;

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Parental Consent Required</Text>
			<Text style={styles.description}>
				You need parental consent to apply for this position. Please have your
				parent or guardian review and approve your application.
			</Text>

			<TouchableOpacity style={styles.button} onPress={onClose}>
				<Text style={styles.buttonText}>I Understand</Text>
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

