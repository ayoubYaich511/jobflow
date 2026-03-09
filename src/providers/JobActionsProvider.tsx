import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { PropsWithChildren } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import { useFocusEffect } from "expo-router";
import {
  ApplyModal,
  ParentConsentModal,
  AppliedSuccess,
  ExternalApplyReportModal,
} from "@/components/JobComponents";
import {
  DefaultModal,
  PrimaryModal,
  CreateCoverLetterModal,
} from "@/components/Modals";
import {
  useAuthenticationFlow,
  useCvWizard,
  useJobActionsModals,
  usePermissionCheck,
  userHooks,
  useTrackApplyClickMutation,
} from "@/hooks";
import { useTranslation } from "@/i18n";
import {
  MockAdjustService,
  mockApiService,
  MockPosthogService,
  MockSentryService,
  MockTrackingService,
} from "@/services";
import { MockLinkUtils as LinkUtils } from "@/services/MockNavigationService";
import { useStore } from "@/store";
import {
  ActionSourceEnum,
  AppliedFrom,
  ClientEvent,
  CommonClientAdditionalDocumentType,
  CommonEmploymentType,
  CommonJobAdLocationRo,
  CommonUserSuggestedStartDateDto,
  CoverLetterGenerationSource,
  JobAdApplyScreenRo,
  JobAdRo,
  OpenedFrom,
  PersonalDataProcessingPermissionKey,
  PersonalDataProcessingPermissionType,
} from "@/types";
import {
  ChatAndApplyLogicUtils,
  DateUtils,
  ErrorHandler,
  Logger,
} from "@/utils";
import { observer } from "mobx-react";

type JobActionsContextType = {
  tryApplyToJob: (info: {
    job: JobAdApplyScreenRo;
    appliedFrom: AppliedFrom;
    hasAddedCv?: boolean;
    location?: CommonJobAdLocationRo;
    referredFrom: OpenedFrom;
  }) => void;
  trySaveJob: (
    info: { job: Pick<JobAdRo, "id" | "savedInfo"> },
    savedFrom: ActionSourceEnum
  ) => Promise<JobAdRo | null>;
  tryStartChatWithJob: (info: {
    job: Pick<JobAdRo, "id" | "chatInfo" | "company" | "interactionSettings">;
    hasAddedCv?: boolean;
    referredFrom: OpenedFrom;
  }) => Promise<void>;
  tryShareJob: (
    info: { job: Pick<JobAdRo, "id" | "company"> },
    sharedFrom: ActionSourceEnum
  ) => void;
  tryMarkJobAsViewed: (info: { job: JobAdRo }) => void;
  tryWithdrawApplication: (info: {
    job: JobAdRo;
    withdrawFrom: AppliedFrom;
    referredFrom: OpenedFrom;
  }) => void;
  openConfirmParentsConsentModal: () => void;
};

export const JobActionsContext = createContext<
  JobActionsContextType | undefined
>(undefined);

export function useJobActions() {
  const context = useContext(JobActionsContext);

  if (context === undefined) {
    throw new Error("useJobActions must be used within JobActionsProvider");
  }

  return context;
}

export const JobActionsProvider = observer(
  ({ children }: PropsWithChildren<{}>) => {
    const { t } = useTranslation();
    const { jobActionStore, appStore, jobsStore, jobSearchStore } = useStore();
    const {
      trySaveJob,
      setPathname,
      tryShareJob,
      tryMarkJobAsViewed,
      tryStartChatWithJob,
      tryWithdrawApplication,
      isVisibleCreateChoice,
      setIsVisibleCreateChoice,
      openNotificationPermissionModal,
    } = useJobActionsModals();
    const { processCvWizardSteps } = useCvWizard();
    const { data: authUser } = userHooks.useGetAuthenticatedUserQuery();

    const openConfirmParentsConsentModal = async () => {
      setIsVisibleParentConsent(true);
    };

    const trackApplyClickMutation = useTrackApplyClickMutation();
    const {
      setAuthProviderApplyCurrentlyState,
      setAuthProviderChatCurrentState,
    } = useAuthenticationFlow();

    const userOnboardingStatus = authUser?.onboardingStatus;
    const [aiGeneratorCount, setAiGeneratorCount] = useState<number>(0);
    const [job, setJob] = useState<JobAdApplyScreenRo | null>(null);
    const [applySource, setApplySource] = useState<AppliedFrom | null>(null);
    const [referredFrom, setReferredFrom] = useState<OpenedFrom | null>(null);
    const [selectedLocations, setSelectedLocations] = useState<
      CommonJobAdLocationRo[]
    >([]);
    const [selectedUserSuggestedStartDate, setSelectedUserSuggestedStartDate] =
      useState<CommonUserSuggestedStartDateDto | null>(null);
    const [steps, setSteps] = useState<number>(0);
    const [currentStep, setCurrentStep] = useState<number>(1);

    const [isVisibleApply, setIsVisibleApply] = useState<boolean>(false);
    const [isCoverLetterModalVisible, setIsCoverLetterModalVisible] =
      useState<boolean>(false);
    const [isVisibleSelectLocations, setIsVisibleSelectLocations] =
      useState<boolean>(false);
    const [isVisibleSelectTime, setIsVisibleSelectTime] =
      useState<boolean>(false);
    const [isVisibleParentConsent, setIsVisibleParentConsent] =
      useState<boolean>(false);
    const [isVisibelApplySuccess, setIsVisibelApplySuccess] =
      useState<boolean>(false);
    const [isVisibleMinimumAge, setIsVisibleMinimumAge] =
      useState<boolean>(false);

    const [isVisibleExternalApplyReport, setIsVisibleExternalApplyReport] =
      useState<boolean>(false);
    const [lastRedirectedJob, setLastRedirectedJob] =
      useState<JobAdApplyScreenRo | null>(null);

    const [isGeneratingQuestions, setIsGeneratingQuestions] =
      useState<boolean>(false);

    const tryApplyToJob = (info: {
      job: JobAdApplyScreenRo;
      appliedFrom: AppliedFrom;
      hasAddedCv?: boolean;
      location?: CommonJobAdLocationRo;
      hasCreatedAccount?: boolean;
      referredFrom: OpenedFrom;
    }) => {
      // This line was removed by mistake in PR #752
      appStore.setCurrentChatState(null);

      // Track apply click and get candidate info
      trackApplyClickMutation.mutate({
        jobAdId: info.job.id,
      });

      if (!authUser || !userOnboardingStatus) return;

      jobActionStore.setInitialState();

      const reportCardEnabledFeatureFlag =
        MockPosthogService.checkReportCardEnabled({});
      const hasAddedReportCard = authUser.additionalDocuments.some(
        (document) =>
          document.type ===
          CommonClientAdditionalDocumentType.SCHOOL_CERTIFICATE
      );

      const redirectInfo = info.job.redirectSettings;

      Logger.info({
        message: `Redirect info`,
        data: JSON.stringify(redirectInfo),
      });

      Logger.info({
        message: `Check birthdate`,
        data: JSON.stringify({
          birthDate: authUser.birthDate,
          startDate: info.job.startDate,
          minimumAge: info.job.minimumAge,
        }),
      });

      if (authUser.birthDate && info.job.startDate && info.job.minimumAge) {
        Logger.info({
          message: `Really checking birthdate`,
        });

        const birthDate = new Date(
          authUser.birthDate.year,
          authUser.birthDate.month,
          authUser.birthDate.day
        );
        const age = DateUtils.getAge(birthDate, new Date(info.job.startDate));
        if (age < info.job.minimumAge) {
          Logger.info({
            message: `Age is less than minimum age, opening modal`,
          });
          setJob(info.job);
          setIsVisibleMinimumAge(true);
          return;
        } else {
          Logger.info({
            message: `Age is greater than minimum age, not opening modal`,
          });
        }
      }

      if (redirectInfo.isRedirected && redirectInfo.redirectUrl) {
        setApplySource(info.appliedFrom);
        setReferredFrom(info.referredFrom);
        LinkUtils.openLink(redirectInfo.redirectUrl).then(() => {
          setLastRedirectedJob(info.job);
        });
      } else {
        const applyState = ChatAndApplyLogicUtils.getApplyInfo({
          jobAd: info.job,
          user: authUser,
        });

        setJob(info.job);
        if (info.location) {
          setSelectedLocations([info.location]);
        }

        switch (applyState) {
          case "applied":
            // do nothing
            break;
          case "incomplete-qualification-questions":
            // Mock navigation - in real app this would use router
            console.log("Navigate to qualification questions");
            break;
          case "can-apply":
            setApplySource(info.appliedFrom);
            setReferredFrom(info.referredFrom);
            resetSteps();

            if (
              (info.job.requireSchoolReport ||
                reportCardEnabledFeatureFlag === "required_to_apply") &&
              !hasAddedReportCard
            ) {
              setPathname();

              // Use the same flow as can-apply-after-finish-profile: fetch steps from backend
              mockApiService.cvWizard.getJobAdOnboardingSteps
                .query({
                  jobAdId: info.job.id,
                })
                .then((res) => {
                  if (res.length > 0) {
                    processCvWizardSteps(res, { fromApplyFlow: true });
                  } else {
                    // Fallback: navigate to CV wizard anyway
                    console.log("Navigate to CV wizard");
                  }
                })
                .catch((e) => {
                  MockSentryService.captureException(e);
                  const error = ErrorHandler.handleErrors(e);
                  console.error(
                    "getJobAdOnboardingStepsQuery error for report card",
                    error
                  );
                  Toast.show({
                    type: "error",
                    text1: error || t("common.something_went_wrong"),
                  });
                  // Navigate to CV wizard anyway as fallback
                  console.log("Navigate to CV wizard as fallback");
                })
                .finally(() => {
                  appStore.setCurrentApplyState(info);
                  appStore.setCurrentFromNavigationApplyState(info);
                });
              return;
            } else {
              if (info.job.locations.length > 0 && !info.location) {
                setSelectedLocations([]);
                setIsVisibleSelectLocations(true);
              } else {
                setIsVisibleApply(true);
              }
            }
            break;
          case "can-apply-after-create-account": {
            setIsVisibleCreateChoice(true);
            setPathname();
            setAuthProviderChatCurrentState(null);
            setAuthProviderApplyCurrentlyState(info);
            break;
          }
          case "can-apply-after-finish-profile":
            setPathname();
            setApplySource(info.appliedFrom);
            appStore.setCurrentApplyState(info);
            appStore.setCurrentFromNavigationApplyState(info);

            // First fetch and process steps, THEN navigate
            mockApiService.cvWizard.getJobAdOnboardingSteps
              .query({
                jobAdId: info.job.id,
              })
              .then((res) => {
                if (res && res.length > 0) {
                  processCvWizardSteps(res, { fromApplyFlow: true });
                  // Navigation happens inside processCvWizardSteps
                } else {
                  setApplySource(info.appliedFrom);
                  setReferredFrom(info.referredFrom);
                  resetSteps();
                  setPathname();
                  if (info.job.locations.length > 0 && !info.location) {
                    setSelectedLocations([]);
                    setIsVisibleSelectLocations(true);
                  } else {
                    setIsVisibleApply(true);
                  }
                }
              })
              .catch((e) => {
                MockSentryService.captureException(e);
                const error = ErrorHandler.handleErrors(e);
                console.error("getJobAdOnboardingStepsQuery error", error);
                Toast.show({
                  type: "error",
                  text1: error || t("common.something_went_wrong"),
                });
              });
            break;
        }
      }
    };

    const resetSteps = () => {
      if (!authUser) return;

      setCurrentStep(1);
      setSteps(1);
    };

    const applyState = useMemo(
      () => appStore.getCurrentApplyState(),
      [appStore.getCurrentApplyState()]
    );

    useFocusEffect(
      useCallback(() => {
        if (applyState && !authUser?.isTempUser) {
          // note, with this approach, there is a slight chance, that the apply process is started,
          // for a user, which has already applied to the position (i.e. because they were first asked
          // to login, and then this happens

          // we need to dismiss all previous screens,
          // because the user was redirected back to the action provider,
          // and without doing this the 'modal' display doesn't work for some reason!
          // TODO: This is a bug!!
          // We need to be able to reset it!!

          tryApplyToJob(applyState);
          appStore.setCurrentApplyState(null);
        }
        // it's deliberately the case, that only the 'applyState' is added here
      }, [applyState])
    );
    const startChatState = appStore.getCurrentChatState();
    useFocusEffect(
      useCallback(() => {
        if (startChatState && !authUser?.isTempUser) {
          tryStartChatWithJob(startChatState);
          appStore.setCurrentChatState(null);
        }
      }, [startChatState])
    );

    useFocusEffect(
      useCallback(() => {
        if (lastRedirectedJob) {
          setIsVisibleExternalApplyReport(true);
        }
      }, [lastRedirectedJob])
    );

    const handleExternalApplied = async () => {
      if (!lastRedirectedJob || !applySource || !referredFrom) return;

      jobActionStore
        .applyExternal({
          jobAdId: lastRedirectedJob.id,
          appliedFrom: applySource,
          referredFrom: referredFrom,
          coverLetterGeneratorUsageCount: aiGeneratorCount,
        })
        .then((res) => {
          // Track job application submission
          MockAdjustService.trackEvent({
            eventToken: "fvzh2c",
            payload: {
              candidateId: res.candidate.id,
              jobId: lastRedirectedJob.id,
              jobName: lastRedirectedJob.externalName,
              teamId: lastRedirectedJob.company.id,
              teamName: lastRedirectedJob.company.name,
            },
          });
        })
        .catch((e) => {
          const error = ErrorHandler.handleErrors(e);

          Toast.show({
            type: "error",
            text1: error,
          });
        });

      setLastRedirectedJob(null);
    };

    const handleExternalNotApplied = () => {
      setLastRedirectedJob(null);
    };

    useFocusEffect(
      useCallback(() => {
        if (jobActionStore.shouldOpenMinimumAgeModalValue) {
          setTimeout(() => {
            setIsVisibleMinimumAge(true);
            jobActionStore.setShouldOpenMinimumAgeModal(false);
          }, 500);
        }
      }, [jobActionStore.shouldOpenMinimumAgeModalValue])
    );

    useFocusEffect(
      useCallback(() => {
        if (jobActionStore.shouldOpenCoverLetterModalValue) {
          setTimeout(() => {
            setIsCoverLetterModalVisible(true);
            jobActionStore.setShouldOpenCoverLetterModal(false);
          }, 500);
        }
      }, [jobActionStore.shouldOpenCoverLetterModalValue])
    );

    useFocusEffect(
      useCallback(() => {
        if (jobActionStore.shouldOpenParentConsentModalValue) {
          setTimeout(() => {
            setIsVisibleParentConsent(true);
            jobActionStore.setShouldOpenParentConsentModal(false);
          }, 500);
        }
      }, [jobActionStore.shouldOpenParentConsentModalValue])
    );

    useFocusEffect(
      useCallback(() => {
        if (jobActionStore.shouldOpenSuccessModalValue) {
          setTimeout(() => {
            setIsVisibelApplySuccess(true);
            jobActionStore.setShouldOpenSuccessModal(false);
          }, 500);
        }
      }, [jobActionStore.shouldOpenSuccessModalValue])
    );

    const handleCreateCoverLetter = async (
      source: CoverLetterGenerationSource
    ) => {
      if (!job) return;

      setIsGeneratingQuestions(true);
      try {
        const result =
          await mockApiService.candidate.draftCustomQuestionToGenerateCoverLetter.query(
            {
              jobAdId: job.id,
              language: "en",
            }
          );

        if (result) {
          // Store all necessary data in the store before navigating
          jobActionStore.setApplyData({
            job,
            applySource,
            referredFrom,
            selectedLocations,
            selectedUserSuggestedStartDate,
            aiGeneratorCount,
          });
          const eventInfo: ClientEvent = {
            eventName: "start_cover_letter",
            payload: {
              generationSource: source,
              jobId: job.id,
            },
          };
          MockTrackingService.captureEvent({}, eventInfo);
          jobActionStore.setCoverLetterQuestions(result);
          setIsCoverLetterModalVisible(false);
          console.log("Navigate to cover letter questions");
        } else {
          Toast.show({
            type: "error",
            text1: t("coverLetter.failedToGenerateQuestions"),
          });
        }
      } catch (error) {
        Toast.show({
          type: "error",
          text1: t("coverLetter.failedToGenerateQuestions"),
        });
      } finally {
        setIsGeneratingQuestions(false);
      }
    };

    const handleContinueWithoutAi = () => {
      if (!job) return;

      // Store all necessary data in the store before navigating
      jobActionStore.setApplyData({
        job,
        applySource,
        referredFrom,
        selectedLocations,
        selectedUserSuggestedStartDate,
        aiGeneratorCount,
      });

      jobActionStore.setCoverLetterQuestions([]);
      setIsCoverLetterModalVisible(false);
      console.log("Navigate to cover letter questions without AI");
    };
    const { checkBeforeProceeding } =
      usePermissionCheck<CoverLetterGenerationSource>({
        permissions: [
          {
            key: PersonalDataProcessingPermissionKey.PROCESS_DATA,
            type: PersonalDataProcessingPermissionType.REQUIRED,
          },
          {
            key: PersonalDataProcessingPermissionKey.USE_AI,
            type: PersonalDataProcessingPermissionType.RECOMMENDED,
          },
        ],
        onPermissionGranted: handleCreateCoverLetter,
        context: "cover_letter_generation",
      });
    return (
      <JobActionsContext.Provider
        value={{
          tryApplyToJob,
          trySaveJob,
          tryStartChatWithJob,
          tryShareJob,
          tryMarkJobAsViewed,
          tryWithdrawApplication,
          openConfirmParentsConsentModal,
        }}
      >
        {children}

        <DefaultModal
          isVisible={isVisibleCreateChoice}
          setIsVisible={setIsVisibleCreateChoice}
          withCross
        >
          <View style={{ padding: 20 }}>
            <Text
              style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
            >
              Great Choice!
            </Text>
            <Text style={{ marginBottom: 20 }}>
              This looks like a great opportunity for you. Would you like to
              create an account to apply?
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: "#007AFF",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
                marginBottom: 8,
              }}
              onPress={() => {
                if (job) {
                  trySaveJob({ job: job }, ActionSourceEnum.GREAT_CHOICE_MODAL);
                }
                setIsVisibleCreateChoice(false);
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                Save Job
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "transparent",
                padding: 12,
                borderRadius: 8,
                alignItems: "center",
              }}
              onPress={() => setIsVisibleCreateChoice(false)}
            >
              <Text style={{ color: "#007AFF", fontWeight: "600" }}>Skip</Text>
            </TouchableOpacity>
          </View>
        </DefaultModal>

        {job ? (
          <>
            <DefaultModal
              withCross
              isVisible={isVisibleSelectLocations}
              setIsVisible={setIsVisibleSelectLocations}
            >
              <View style={{ padding: 20 }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
                >
                  Select Location
                </Text>
                <Text style={{ marginBottom: 20 }}>
                  Choose the location(s) where you'd like to work:
                </Text>
                {job.locations.map((location, index) => (
                  <TouchableOpacity
                    key={index}
                    style={{
                      backgroundColor: selectedLocations.some(
                        (l) => l.id === location.id
                      )
                        ? "#007AFF"
                        : "#f0f0f0",
                      padding: 12,
                      borderRadius: 8,
                      marginBottom: 8,
                    }}
                    onPress={() => {
                      if (selectedLocations.some((l) => l.id === location.id)) {
                        setSelectedLocations(
                          selectedLocations.filter((l) => l.id !== location.id)
                        );
                      } else {
                        setSelectedLocations([...selectedLocations, location]);
                      }
                    }}
                  >
                    <Text
                      style={{
                        color: selectedLocations.some(
                          (l) => l.id === location.id
                        )
                          ? "white"
                          : "#333",
                        fontWeight: "600",
                      }}
                    >
                      {location.name}, {location.city}
                    </Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={{
                    backgroundColor: "#007AFF",
                    padding: 12,
                    borderRadius: 8,
                    alignItems: "center",
                    marginTop: 20,
                  }}
                  onPress={() => {
                    if (selectedLocations.length > 0) {
                      setIsVisibleSelectLocations(false);
                      if (
                        job.employmentTypes.includes(
                          CommonEmploymentType.INTERNSHIP
                        )
                      ) {
                        // This is a hack to ensure that the select time modal is visible in iOS.
                        setTimeout(() => {
                          setIsVisibleSelectTime(true);
                        }, 500);
                      } else {
                        setIsVisibleApply(true);
                      }
                    } else {
                      Toast.show({
                        type: "error",
                        text1: t("common.select_at_least_one_location"),
                      });
                    }
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </DefaultModal>
            <DefaultModal
              withCross
              isVisible={isVisibleSelectTime}
              setIsVisible={setIsVisibleSelectTime}
            >
              <View style={{ padding: 20 }}>
                <Text
                  style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}
                >
                  Select Start Date
                </Text>
                <Text style={{ marginBottom: 20 }}>
                  When would you like to start this internship?
                </Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: "#007AFF",
                    padding: 12,
                    borderRadius: 8,
                    alignItems: "center",
                    marginTop: 20,
                  }}
                  onPress={() => {
                    setIsVisibleSelectTime(false);
                    setIsVisibleApply(true);
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "600" }}>
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </DefaultModal>
            <ApplyModal
              job={job}
              isVisible={isVisibleApply}
              selectedLocations={selectedLocations}
              setIsVisible={setIsVisibleApply}
              onAfterApply={({ qualificationQuestions }) => {
                jobActionStore.setPrivacyLinks(
                  job.company.privacyLinks?.content ?? null
                );
                jobActionStore.setQualificationQuestions(
                  qualificationQuestions ?? []
                );
                jobActionStore.setSelectedLocations(selectedLocations);

                // Close the apply modal
                setIsVisibleApply(false);

                // Check if we need to show qualification questions
                if (
                  (qualificationQuestions &&
                    qualificationQuestions.length > 0) ||
                  job.company.privacyLinks
                ) {
                  console.log("Navigate to qualification questions");
                } else {
                  // No qualification questions or privacy links, go directly to cover letter
                  setIsCoverLetterModalVisible(true);
                }
              }}
            />
            <PrimaryModal
              customStyles={{
                paddingHorizontal: 20,
              }}
              isVisible={isVisibleMinimumAge}
              setIsVisible={setIsVisibleMinimumAge}
              title={t("minimumAgeModal.heading", {
                age: job.minimumAge,
              })}
              description={t("minimumAgeModal.subHeading", {
                age: job.minimumAge,
                startDate: DateUtils.formatToMMDDYYYY(
                  job.startDate ? new Date(job.startDate) : new Date()
                ),
              })}
              primaryButton={{
                text: t("minimumAgeModal.button"),
                onPress: () => setIsVisibleMinimumAge(false),
              }}
            />

            <CreateCoverLetterModal
              isVisible={isCoverLetterModalVisible}
              setIsVisible={setIsCoverLetterModalVisible}
              onCreateCoverLetter={() => {
                checkBeforeProceeding(
                  CoverLetterGenerationSource.CREATE_COVER_LETTER_MODAL
                );
              }}
              isLoading={isGeneratingQuestions}
              onContinueWithout={handleContinueWithoutAi}
            />
          </>
        ) : null}

        <ParentConsentModal
          isVisible={isVisibleParentConsent}
          onClose={() => setIsVisibleParentConsent(false)}
        />

        {job ? (
          <AppliedSuccess
            job={job}
            isVisible={isVisibelApplySuccess}
            setIsVisible={setIsVisibelApplySuccess}
            onClose={async () => {
              setIsVisibelApplySuccess(false);
              await openNotificationPermissionModal();
            }}
          />
        ) : null}

        {lastRedirectedJob ? (
          <ExternalApplyReportModal
            job={lastRedirectedJob}
            isVisible={isVisibleExternalApplyReport}
            setIsVisible={setIsVisibleExternalApplyReport}
            onApplied={handleExternalApplied}
            onDidNotApply={handleExternalNotApplied}
          />
        ) : null}
      </JobActionsContext.Provider>
    );
  }
);
