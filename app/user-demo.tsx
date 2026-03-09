import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  useGetUser,
  useUpdatePersonalData,
  useAddWorkExperience,
  useUpdateWorkExperience,
  useAddCertification,
  useUpdateCertification,
  useGetOnboardingSteps,
  useMarkAsSeen,
} from "../src/hooks/useUserHooks";
import { UserOnboardingStepType, UserPersonalDataOnboardingStep, UserWorkExperienceOnboardingStep } from "../src/models";
import { Certification, WorkExperience, PersonalData, YesNoQuestion, StepIndicator } from "../src/components";

export default function UserDemoPage() {
  const { data: user, isLoading, error } = useGetUser();
  const { data: onboardingSteps, isLoading: isLoadingSteps } =
    useGetOnboardingSteps();
  const [isOptionalStepsAnswered, setIsOptionalStepsAnswered] = useState<{ [key: string]: undefined | boolean }>({})
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [accumatedData, setAccumatedData] = useState<{
    personal?: { firstName: string; lastName: string };
    workExperiences: Array<{ company: string; startYear: string; endYear: string }>;
    certifications?: { name: string; year: string };
  }>({
    workExperiences: [],
    certifications: undefined,
  })


  const filteredSteps = onboardingSteps?.filter(step => step.shouldBeShown) || []
  const allDataSteps: any[] = []
  for (let index = 0; index < filteredSteps?.length; index++) {
    const step: UserWorkExperienceOnboardingStep = filteredSteps[index];
    if (step.isRequired) {
      allDataSteps.push(step)
    }
    else if (step.type === UserOnboardingStepType.WORK_EXPERIENCE && step.maxToAdd > 0) {
      allDataSteps.push(
        ...Array.from({ length: step.maxToAdd }, (el, x) => ({
          ...step,
          stepWorkExperienceIndex: x,
          question: "Do you already have work experience?"
        }))
      );

    }
    else {
      allDataSteps.push({ ...step, question: "Do you have a certification?" })
    }
  }

  const goToNextStep = (skipStep: number = 1) => {
    setCurrentStepIndex((prev) => prev + skipStep)
  }

  const answerYesNoQuestion = (stepId: string, value: boolean) => {
    setIsOptionalStepsAnswered({
      ...isOptionalStepsAnswered,
      [stepId]: value,
    })

    if (!value) {
      const currentStep = allDataSteps[currentStepIndex];
      const skipStep = currentStep.type === UserOnboardingStepType.WORK_EXPERIENCE
        ? currentStep.stepWorkExperienceIndex + 1
        : 1;
      goToNextStep(skipStep);
    }
  }

  const renderStepComponent = (step: UserWorkExperienceOnboardingStep) => {
    switch (step.type) {
      case UserOnboardingStepType.CERTIFICATION:
        return <Certification accumatedData={accumatedData} setAccumatedData={setAccumatedData} />

      case UserOnboardingStepType.WORK_EXPERIENCE:
        return <WorkExperience
          index={step.stepWorkExperienceIndex}
          accumatedData={accumatedData}
          setAccumatedData={setAccumatedData}
        />

      default:
        return <PersonalData accumatedData={accumatedData} setAccumatedData={setAccumatedData} />
    }
  }

  const renderOptionalStep = (step: UserWorkExperienceOnboardingStep) => {
    const answer = isOptionalStepsAnswered[step.id]
    return (
      <>
        <YesNoQuestion
          question={step.question}
          answer={answer}
          onYes={() => answerYesNoQuestion(step.id, true)}
          onNo={() => answerYesNoQuestion(step.id, false)}
        />
        {answer === true && renderStepComponent(step)}
      </>
    )
  }

  const renderRequiredStep = (step: UserWorkExperienceOnboardingStep) => {
    return renderStepComponent(step)
  }

  const renderAllSteps = () => {
    const step = allDataSteps[currentStepIndex]

    if (step.isRequired) {
      return renderRequiredStep(step)
    }

    return renderOptionalStep(step)
  }


  if (isLoading || isLoadingSteps) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading user data...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error loading user data</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>User Data Management Demo</Text>
      <Text style={styles.subtitle}>
        Test React Query hooks for user data management
      </Text>
      <StepIndicator currentStep={currentStepIndex} totalSteps={allDataSteps.length} />
      <View style={styles.stepWrapper}>
        {renderAllSteps()}
      </View>
      <TouchableOpacity
        style={styles.nextButton}
        onPress={goToNextStep}
      >
        <Text style={styles.nextBtn}>
          Next
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  nextBtn: { color: "white", textAlign: "center" },
  stepWrapper: { flexGrow: 1 },
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
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    color: "#666",
    marginTop: 50,
  },
  errorText: {
    fontSize: 18,
    textAlign: "center",
    color: "#ff4444",
    marginTop: 50,
  },
});
