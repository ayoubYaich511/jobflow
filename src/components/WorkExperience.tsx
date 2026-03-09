import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
} from "react-native";

interface WorkExperienceProps {
    index: number;
    accumatedData: any;
    setAccumatedData: (data: any) => void;
}

export default function WorkExperience({ index, accumatedData, setAccumatedData }: WorkExperienceProps) {
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
                style={styles.input}
                placeholder="Company Name"
                value={accumatedData.workExperiences[index]?.company || ""}
                onChangeText={(value) => handleChange("company", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Start Year"
                value={accumatedData.workExperiences[index]?.startYear || ""}
                onChangeText={(value) => handleChange("startYear", value)}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="End Year"
                value={accumatedData.workExperiences[index]?.endYear || ""}
                onChangeText={(value) => handleChange("endYear", value)}
                keyboardType="numeric"
            />
        </View>
    );
}

const styles = StyleSheet.create({
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
});
