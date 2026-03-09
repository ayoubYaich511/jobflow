import React, { useState } from "react";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    StyleSheet,
} from "react-native";

interface WorkExperienceProps {
    maxToAdd: number;
    onComplete: () => void;
}

export default function WorkExperience({ maxToAdd, onComplete }: WorkExperienceProps) {
    const [experiences, setExperiences] = useState(
        Array.from({ length: maxToAdd }, () => ({
            company: "",
            startYear: "",
            endYear: "",
        }))
    );

    const handleChange = (index: number, field: string, value: string) => {
        const updated = [...experiences];
        updated[index] = { ...updated[index], [field]: value };
        setExperiences(updated);
    };

    return (
        <View style={styles.container}>
            {experiences.map((experience, index) => (
                <View key={index} style={styles.experienceBlock}>
                    <Text style={styles.label}>Experience {index + 1}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Company Name"
                        value={experience.company}
                        onChangeText={(value) => handleChange(index, "company", value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Start Year"
                        value={experience.startYear}
                        onChangeText={(value) => handleChange(index, "startYear", value)}
                        keyboardType="numeric"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="End Year"
                        value={experience.endYear}
                        onChangeText={(value) => handleChange(index, "endYear", value)}
                        keyboardType="numeric"
                    />
                </View>
            ))}
            <TouchableOpacity
                style={styles.button}
                onPress={onComplete}
            >
                <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    experienceBlock: {
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    label: {
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 14,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    button: {
        backgroundColor: "#2196F3",
        padding: 10,
        borderRadius: 5,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },
});
