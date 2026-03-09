import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
} from "react-native";

interface PersonalDataProps {
    accumatedData: any;
    setAccumatedData: (data: any) => void;
}

export default function PersonalData({ accumatedData, setAccumatedData }: PersonalDataProps) {
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={accumatedData.personal?.firstName || ""}
                onChangeText={(value) => {
                    setAccumatedData((prev: any) => ({
                        ...prev,
                        personal: { ...prev.personal, firstName: value, lastName: prev.personal?.lastName || "" }
                    }));
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={accumatedData.personal?.lastName || ""}
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
});
