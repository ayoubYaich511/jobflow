import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useJobActions } from "../src/providers/JobActionsProvider";
import {
  AppliedFrom,
  CommonEmploymentType,
  JobAdApplyScreenRo,
  OpenedFrom,
  UserJobAdStatus,
} from "../src/types";

// Mock job data for testing
const mockJob: JobAdApplyScreenRo = {
  id: "job-1",
  externalName: "Software Developer Intern",
  employmentTypes: [
    CommonEmploymentType.INTERNSHIP,
    CommonEmploymentType.PART_TIME,
  ],
  qualificationQuestions: [
    {
      id: "q1",
      question: "Do you have experience with React?",
      isRequired: true,
      type: "yes_no",
    },
  ],
  locations: [
    {
      id: "loc-1",
      name: "Berlin Office",
      address: "123 Main St",
      postalCode: "10115",
      city: "Berlin",
      country: "Germany",
      locationType: "plain",
    },
    {
      id: "loc-2",
      name: "Munich Office",
      address: "456 Tech Ave",
      postalCode: "80331",
      city: "Munich",
      country: "Germany",
      locationType: "plain",
    },
  ],
  interactionSettings: {
    allowChat: true,
    allowApply: true,
    allowSave: true,
    allowShare: true,
  },
  company: {
    id: "company-1",
    name: "TechCorp GmbH",
    logoImg: {
      variants: {
        min_dim_128_url: "https://example.com/logo.png",
      },
    },
    privacyLinks: {
      content: "Privacy policy content here...",
    },
  },
  jobGroup: {
    id: "group-1",
    name: "Software Development",
    type: "TECHNICAL",
  },
  onlyAllowSingleLocationSelect: false,
  appliedInfo: null,
  savedInfo: null,
  viewedInfo: null,
  status: UserJobAdStatus.DEFAULT,
  chatInfo: {
    isActive: false,
    unreadCount: 0,
  },
  redirectSettings: {
    isRedirected: false,
  },
  waitingForReapplySince: null,
  minimumAge: 18,
  startDate: new Date("2024-06-01"),
  requireSchoolReport: false,
  waitingForParentConsentConfirmation: false,
  subsidiary: null,
};

export default function ApplyPage() {
  const { tryApplyToJob, trySaveJob, tryShareJob, tryMarkJobAsViewed } =
    useJobActions();

  const handleApply = () => {
    tryApplyToJob({
      job: mockJob,
      appliedFrom: AppliedFrom.JOB_DETAILS,
      referredFrom: OpenedFrom.JOB_DETAILS,
    });
  };

  const handleSave = () => {
    trySaveJob(
      { job: { id: mockJob.id, savedInfo: null } },
      "job_details" as any
    );
  };

  const handleShare = () => {
    tryShareJob(
      { job: { id: mockJob.id, company: mockJob.company } },
      "job_details" as any
    );
  };

  const handleMarkAsViewed = () => {
    tryMarkJobAsViewed({ job: mockJob as any });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Job Application Demo</Text>
      <Text style={styles.subtitle}>
        Test the complete job application flow with all modals and features.
      </Text>

      <View style={styles.jobCard}>
        <Text style={styles.jobTitle}>{mockJob.externalName}</Text>
        <Text style={styles.companyName}>{mockJob.company.name}</Text>
        <Text style={styles.jobDescription}>
          Software Developer Internship at TechCorp GmbH
        </Text>
        <Text style={styles.jobDetails}>
          Locations: {mockJob.locations.map((loc) => loc.city).join(", ")}
        </Text>
        <Text style={styles.jobDetails}>
          Employment Types: {mockJob.employmentTypes.join(", ")}
        </Text>
        <Text style={styles.jobDetails}>Minimum Age: {mockJob.minimumAge}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.primaryButton} onPress={handleApply}>
          <Text style={styles.buttonText}>Apply to Job</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleSave}>
          <Text style={styles.secondaryButtonText}>Save Job</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.secondaryButton} onPress={handleShare}>
          <Text style={styles.secondaryButtonText}>Share Job</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleMarkAsViewed}
        >
          <Text style={styles.secondaryButtonText}>Mark as Viewed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  jobCard: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  jobTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  jobDescription: {
    fontSize: 14,
    color: "#888",
    marginBottom: 12,
  },
  jobDetails: {
    fontSize: 12,
    color: "#999",
    marginBottom: 4,
  },
  buttonContainer: {
    gap: 12,
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
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
});
