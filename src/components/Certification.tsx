import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
} from "react-native";

interface CertificationProps {
    accumatedData: any;
    setAccumatedData: (data: any) => void;
    showErrors?: boolean;
}

export default function Certification({ accumatedData, setAccumatedData, showErrors = false }: CertificationProps) {
    const certName = accumatedData.certifications?.name || "";
    const certYear = accumatedData.certifications?.year || "";

    const isNameEmpty = showErrors && !certName.trim();
    const isYearEmpty = showErrors && !certYear.trim();
    const handleChange = (field: string, value: string) => {
        setAccumatedData((prev: any) => ({
            ...prev,
            certifications: { ...prev.certifications, [field]: value }
        }));
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    isNameEmpty && styles.inputError,
                ]}
                placeholder="Certification Name"
                value={certName}
                onChangeText={(value) => handleChange("name", value)}
            />
            <TextInput
                style={[
                    styles.input,
                    isYearEmpty && styles.inputError,
                ]}
                placeholder="Certification Year"
                value={certYear}
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
    inputError: {
        borderColor: "#ff0000",
        borderWidth: 2,
    },
});
