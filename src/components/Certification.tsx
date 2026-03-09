import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
} from "react-native";

interface CertificationProps {
    accumatedData: any;
    setAccumatedData: (data: any) => void;
}

export default function Certification({ accumatedData, setAccumatedData }: CertificationProps) {
    const handleChange = (field: string, value: string) => {
        setAccumatedData((prev: any) => ({
            ...prev,
            certifications: { ...prev.certifications, [field]: value }
        }));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Certification Name"
                value={accumatedData.certifications?.name || ""}
                onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
                style={styles.input}
                placeholder="Certification Year"
                value={accumatedData.certifications?.year || ""}
                onChangeText={(value) => handleChange("year", value)}
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
