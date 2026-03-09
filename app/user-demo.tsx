import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import {
  useGetUser,
  useUpdatePersonalData,
  useAddWorkExperience,
  useAddCertification,
  useGetOnboardingSteps,
} from "../src/hooks/useUserHooks";
import { UserOnboardingStepType, UserWorkExperienceOnboardingStep } from "../src/models";
import { Certification, WorkExperience, PersonalData, YesNoQuestion, StepIndicator } from "../src/components";

export default function UserDemoPage() {
  const { data: user, isLoading, error } = useGetUser();
  const { data: onboardingSteps, isLoading: isLoadingSteps } =
    useGetOnboardingSteps();
  const updatePersonalData = useUpdatePersonalData();
  const addWorkExperience = useAddWorkExperience();
  const addCertification = useAddCertification();

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
  const [showValidationErrors, setShowValidationErrors] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isPersonalDataValid = () => {
    const firstName = accumatedData.personal?.firstName?.trim() || "";
    const lastName = accumatedData.personal?.lastName?.trim() || "";
    return firstName.length > 0 && lastName.length > 0;
  };

  const isWorkExperienceValid = (index: number) => {
    const workExp = accumatedData.workExperiences[index];
    if (!workExp) return false;
    const company = workExp.company?.trim() || "";
    const startYear = workExp.startYear?.trim() || "";
    const endYear = workExp.endYear?.trim() || "";
    return company.length > 0 && startYear.length > 0 && endYear.length > 0;
  };

  const isCertificationValid = () => {
    const cert = accumatedData.certifications;
    if (!cert) return false;
    const name = cert.name?.trim() || "";
    const year = cert.year?.trim() || "";
    return name.length > 0 && year.length > 0;
  };

  const submitApiCall = async (mutationFn: any, payload: any) => {
    setIsSubmitting(true);
    try {
      await mutationFn(payload);
      setShowValidationErrors(false);
      setIsSubmitting(false);
      goToNextStep();
    } catch (err) {
      console.error("Failed to submit data", err);
      setIsSubmitting(false);
    }
  }

  const submitPersonalData = async () => {
    if (!isPersonalDataValid()) {
      setShowValidationErrors(true);
      return;
    }

    submitApiCall(updatePersonalData.mutateAsync, {
      firstName: accumatedData.personal!.firstName,
      lastName: accumatedData.personal!.lastName,
    });
  };

  const submitWorkExperience = async (index: number) => {
    if (!isWorkExperienceValid(index)) {
      setShowValidationErrors(true);
      return;
    }

    submitApiCall(addWorkExperience.mutateAsync, {
      company: accumatedData.workExperiences[index].company,
      startYear: accumatedData.workExperiences[index].startYear,
      endYear: accumatedData.workExperiences[index].endYear,
    });
  };

  const submitCertification = async () => {
    if (!isCertificationValid()) {
      setShowValidationErrors(true);
      return;
    }

    submitApiCall(addCertification.mutateAsync, {
      name: accumatedData.certifications!.name,
      year: accumatedData.certifications!.year,
    });
  };


  const filteredSteps = onboardingSteps?.filter(step => step.shouldBeShown) || []
  const allDataSteps: any[] = []
  for (let index = 0; index < filteredSteps?.length; index++) {
    const step: UserWorkExperienceOnboardingStep = filteredSteps[index];
    if (step.isRequired) {
      allDataSteps.push(step)
    }
    else if (step.type === UserOnboardingStepType.WORK_EXPERIENCE && step.maxToAdd > 0) {
      allDataSteps.push(
        ...Array.from({ length: step.maxToAdd }, (_, x) => ({
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

  const handleSubmitStep = async () => {
    const step = allDataSteps[currentStepIndex];
    switch (step.type) {
      case UserOnboardingStepType.PERSONAL_DATA:
        await submitPersonalData();
        break;
      case UserOnboardingStepType.WORK_EXPERIENCE:
        await submitWorkExperience(step.stepWorkExperienceIndex);
        break;
      case UserOnboardingStepType.CERTIFICATION:
        await submitCertification();
        break;
      default:
        goToNextStep();
    }

  };

  const goToNextStep = (skipStep: number = 1) => {
    setShowValidationErrors(false);
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
        return <Certification accumatedData={accumatedData} setAccumatedData={setAccumatedData} showErrors={showValidationErrors} />

      case UserOnboardingStepType.WORK_EXPERIENCE:
        return <WorkExperience
          index={step.stepWorkExperienceIndex}
          accumatedData={accumatedData}
          setAccumatedData={setAccumatedData}
          showErrors={showValidationErrors}
        />

      default:
        return <PersonalData accumatedData={accumatedData} setAccumatedData={setAccumatedData} showErrors={showValidationErrors} />
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
        style={[styles.nextButton, showValidationErrors && styles.nextButtonDisabled]}
        onPress={handleSubmitStep}
        disabled={showValidationErrors || isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.nextBtn}>Next</Text>
        )}
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
  nextButton: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  nextButtonDisabled: {
    backgroundColor: "#cccccc",
  },
});
