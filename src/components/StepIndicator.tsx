import React from "react";
import {
    View,
    Text,
    StyleSheet,
} from "react-native";

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

export default function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
    const progress = totalSteps > 0 ? (currentStep / totalSteps) * 100 : 0;

    return (
        <View style={styles.container}>
            <View style={styles.progressBarContainer}>
                <View
                    style={[
                        styles.progressBar,
                        { width: `${progress}%` }
                    ]}
                />
            </View>
            <Text style={styles.stepText}>
                Step {currentStep + 1} of {totalSteps}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    progressBarContainer: {
        height: 8,
        backgroundColor: "#e0e0e0",
        borderRadius: 4,
        overflow: "hidden",
        marginBottom: 10,
    },
    progressBar: {
        height: "100%",
        backgroundColor: "#2196F3",
    },
    stepText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
    },
});
