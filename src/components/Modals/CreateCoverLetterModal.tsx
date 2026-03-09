import React from "react";
import {
	ActivityIndicator,
	Dimensions,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface CreateCoverLetterModalProps {
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	onCreateCoverLetter: () => void;
	isLoading: boolean;
	onContinueWithout: () => void;
}

const { width, height } = Dimensions.get("window");

export const CreateCoverLetterModal: React.FC<CreateCoverLetterModalProps> = ({
	isVisible,
	setIsVisible,
	onCreateCoverLetter,
	isLoading,
	onContinueWithout,
}) => {
	return (
		<Modal
			visible={isVisible}
			transparent
			animationType="fade"
			onRequestClose={() => setIsVisible(false)}
		>
			<View style={styles.overlay}>
				<View style={styles.modal}>
					<Text style={styles.title}>Create Cover Letter</Text>
					<Text style={styles.description}>
						Would you like to use AI to generate a personalized cover letter for
						this position?
					</Text>

					<View style={styles.buttonContainer}>
						<TouchableOpacity
							style={[styles.button, styles.primaryButton]}
							onPress={onCreateCoverLetter}
							disabled={isLoading}
						>
							{isLoading ? (
								<ActivityIndicator color="white" />
							) : (
								<Text style={styles.primaryButtonText}>Generate with AI</Text>
							)}
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.button, styles.secondaryButton]}
							onPress={onContinueWithout}
						>
							<Text style={styles.secondaryButtonText}>
								Continue without AI
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modal: {
		backgroundColor: "white",
		borderRadius: 12,
		padding: 24,
		margin: 20,
		width: width * 0.9,
		maxWidth: 400,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#333",
		marginBottom: 12,
		textAlign: "center",
	},
	description: {
		fontSize: 16,
		color: "#666",
		marginBottom: 24,
		textAlign: "center",
		lineHeight: 22,
	},
	buttonContainer: {
		gap: 12,
	},
	button: {
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: "center",
	},
	primaryButton: {
		backgroundColor: "#007AFF",
	},
	secondaryButton: {
		backgroundColor: "transparent",
		borderWidth: 1,
		borderColor: "#007AFF",
	},
	primaryButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
	secondaryButtonText: {
		color: "#007AFF",
		fontSize: 16,
		fontWeight: "600",
	},
});

