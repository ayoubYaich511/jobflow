

export interface UserRo {
    firstName: string | null
    lastName: string | null
    workExperiences: WorkExperienceRo[];
    certification: CertificationRo | null;
    seenSteps: UserOnboardingStepType[];
}

export interface WorkExperienceRo {
    id: string;
    companyName: string;
    position: string;
    startYear: number;
    endYear: number;
}

export interface CertificationRo {
    id: string;
    name: string;
    year: number;
}

export enum UserOnboardingStepType {
    PERSONAL_DATA = "PERSONAL_DATA",
    WORK_EXPERIENCE = "WORK_EXPERIENCE",
    CERTIFICATION = "CERTIFICATION",
}

export interface UserWorkExperienceOnboardingStep {
    id: string
    type: UserOnboardingStepType.WORK_EXPERIENCE;
    isRequired: boolean;
    maxToAdd: number;
    shouldBeShown: boolean;
}

export interface UserPersonalDataOnboardingStep {
    type: UserOnboardingStepType.PERSONAL_DATA;
    isRequired: boolean;
    shouldBeShown: boolean;
}


export interface UserCertificationOnboardingStep {
    type: UserOnboardingStepType.CERTIFICATION;
    isRequired: boolean;
    shouldBeShown: boolean;
}

export type UserOnboardingStep =
    | UserWorkExperienceOnboardingStep
    | UserPersonalDataOnboardingStep
    | UserCertificationOnboardingStep;
