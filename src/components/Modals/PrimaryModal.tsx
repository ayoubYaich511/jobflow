import React from "react";
import {
	Dimensions,
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface PrimaryButton {
	text: string;
	onPress: () => void;
}

interface PrimaryModalProps {
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	title: string;
	description: string;
	primaryButton: PrimaryButton;
	customStyles?: any;
}

const { width, height } = Dimensions.get("window");

export const PrimaryModal: React.FC<PrimaryModalProps> = ({
	isVisible,
	setIsVisible,
	title,
	description,
	primaryButton,
	customStyles,
}) => {
	return (
		<Modal
			visible={isVisible}
			transparent
			animationType="fade"
			onRequestClose={() => setIsVisible(false)}
		>
			<View style={styles.overlay}>
				<View style={[styles.modal, customStyles]}>
					<Text style={styles.title}>{title}</Text>
					<Text style={styles.description}>{description}</Text>
					<TouchableOpacity
						style={styles.primaryButton}
						onPress={primaryButton.onPress}
					>
						<Text style={styles.primaryButtonText}>{primaryButton.text}</Text>
					</TouchableOpacity>
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
	primaryButton: {
		backgroundColor: "#007AFF",
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		alignItems: "center",
	},
	primaryButtonText: {
		color: "white",
		fontSize: 16,
		fontWeight: "600",
	},
});

