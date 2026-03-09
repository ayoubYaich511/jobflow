import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
} from "react-native";

interface PersonalDataProps {
    accumatedData: any;
    setAccumatedData: (data: any) => void;
    showErrors?: boolean;
}

export default function PersonalData({ accumatedData, setAccumatedData, showErrors = false }: PersonalDataProps) {
    const firstName = accumatedData.personal?.firstName || "";
    const lastName = accumatedData.personal?.lastName || "";
    const isFirstNameEmpty = showErrors && !firstName.trim();
    const isLastNameEmpty = showErrors && !lastName.trim();

    return (
        <View style={styles.container}>
            <TextInput
                style={[
                    styles.input,
                    isFirstNameEmpty && styles.inputError,
                ]}
                placeholder="First Name"
                value={firstName}
                onChangeText={(value) => {
                    setAccumatedData((prev: any) => ({
                        ...prev,
                        personal: { ...prev.personal, firstName: value, lastName: prev.personal?.lastName || "" }
                    }));
                }}
            />
            <TextInput
                style={[
                    styles.input,
                    isLastNameEmpty && styles.inputError,
                ]}
                placeholder="Last Name"
                value={lastName}
                onChangeText={(value) => {
                    setAccumatedData((prev: any) => ({
                        ...prev,
                        personal: { ...prev.personal, firstName: prev.personal?.firstName || "", lastName: value }
                    }));
                }}
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
