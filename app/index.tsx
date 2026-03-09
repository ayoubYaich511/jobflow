import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Link } from "expo-router";

export default function HomePage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jobflow Challenge Demo</Text>
      <Text style={styles.subtitle}>
        This is a simplified version of the JobActionsProvider for coding
        challenge purposes.
      </Text>

      <Link href="/apply" asChild>
        <TouchableOpacity style={styles.primaryButton}>
          <Text style={styles.buttonText}>Go to Apply Page</Text>
        </TouchableOpacity>
      </Link>

      <Link href="/user-demo" asChild>
        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>User Data Demo</Text>
        </TouchableOpacity>
      </Link>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>What this demo shows:</Text>
        <Text style={styles.infoText}>
          • Complete job application flow with multiple modals
        </Text>
        <Text style={styles.infoText}>
          • Location selection for multi-location jobs
        </Text>
        <Text style={styles.infoText}>
          • Age verification for minimum age requirements
        </Text>
        <Text style={styles.infoText}>
          • Cover letter generation with AI permission checks
        </Text>
        <Text style={styles.infoText}>• External application tracking</Text>
        <Text style={styles.infoText}>
          • Parental consent for underage users
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 22,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 24,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
  infoSection: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
    lineHeight: 20,
  },
});
