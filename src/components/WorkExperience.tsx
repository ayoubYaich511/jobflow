import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Text
} from "react-native";

interface WorkExperienceProps {
    index: number;
    accumatedData: any;
    setAccumatedData: (data: any) => void;
    showErrors?: boolean;
}

export default function WorkExperience({ index, accumatedData, setAccumatedData, showErrors = false }: WorkExperienceProps) {
    const company = accumatedData.workExperiences[index]?.company || "";
    const startYear = accumatedData.workExperiences[index]?.startYear || "";
    const endYear = accumatedData.workExperiences[index]?.endYear || "";

    const isCompanyEmpty = showErrors && !company.trim();
    const isStartYearEmpty = showErrors && !startYear.trim();
    const isEndYearEmpty = showErrors && !endYear.trim();
    const handleChange = (field: string, value: string) => {
        setAccumatedData((prev: any) => {
            const updated = [...prev.workExperiences];
            updated[index] = { ...updated[index], [field]: value };
            return { ...prev, workExperiences: updated };
        });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    isCompanyEmpty && styles.inputError,
                ]}
                placeholder="Company Name"
                value={company}
                onChangeText={(value) => handleChange("company", value)}
            />
            <TextInput
                style={[
                    styles.input,
                    isStartYearEmpty && styles.inputError,
                ]}
                placeholder="Start Year"
                value={startYear}
                onChangeText={(value) => handleChange("startYear", value)}
                keyboardType="numeric"
            />
            <TextInput
                style={[
                    styles.input,
                    isEndYearEmpty && styles.inputError,
                ]}
                placeholder="End Year"
                value={endYear}
                onChangeText={(value) => handleChange("endYear", value)}
                keyboardType="numeric"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
        textAlign: "center",
    },
    container: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    inputError: {
        borderColor: "#ff0000",
        borderWidth: 2,
    },
});
