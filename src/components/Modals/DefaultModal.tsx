import React from "react";
import {
	Dimensions,
	Modal,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

interface DefaultModalProps {
	isVisible: boolean;
	setIsVisible: (visible: boolean) => void;
	children: React.ReactNode;
	withCross?: boolean;
	customStyles?: any;
}

const { width, height } = Dimensions.get("window");

export const DefaultModal: React.FC<DefaultModalProps> = ({
	isVisible,
	setIsVisible,
	children,
	withCross = false,
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
					{withCross && (
						<TouchableOpacity
							style={styles.closeButton}
							onPress={() => setIsVisible(false)}
						>
							<Text style={styles.closeButtonText}>×</Text>
						</TouchableOpacity>
					)}
					<ScrollView contentContainerStyle={styles.content}>
						{children}
					</ScrollView>
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
		padding: 20,
		margin: 20,
		maxHeight: height * 0.8,
		width: width * 0.9,
		maxWidth: 400,
	},
	closeButton: {
		position: "absolute",
		top: 10,
		right: 10,
		zIndex: 1,
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: "#f0f0f0",
		justifyContent: "center",
		alignItems: "center",
	},
	closeButtonText: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#666",
	},
	content: {
		flexGrow: 1,
	},
});

