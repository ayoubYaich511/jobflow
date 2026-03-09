import React from "react";
import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

interface YesNoQuestionProps {
    question: string;
    answer: boolean | undefined;
    onYes: () => void;
    onNo: () => void;
}

export default function YesNoQuestion({
    question,
    answer,
    onYes,
    onNo,
}: YesNoQuestionProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.question}>{question}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.button,
                        answer === true && styles.buttonActive,
                    ]}
                    onPress={onYes}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            answer === true && styles.buttonTextActive,
                        ]}
                    >
                        Yes
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.button,
                        answer === false && styles.buttonActive,
                    ]}
                    onPress={onNo}
                >
                    <Text
                        style={[
                            styles.buttonText,
                            answer === false && styles.buttonTextActive,
                        ]}
                    >
                        No
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    question: {
        fontSize: 16,
        fontWeight: "500",
        marginBottom: 15,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        gap: 10,
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        alignItems: "center",
    },
    buttonActive: {
        backgroundColor: "#2196F3",
        borderColor: "#2196F3",
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "500",
        color: "#333",
    },
    buttonTextActive: {
        color: "white",
    },
});
