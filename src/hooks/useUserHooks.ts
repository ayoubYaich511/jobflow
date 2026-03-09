import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { UserRo, WorkExperienceRo, CertificationRo, UserOnboardingStep, UserOnboardingStepType } from '../models';

// Mock user data - starts empty as requested
let mockUserData: UserRo = {
    firstName: null,
    lastName: null,
    workExperiences: [],
    certification: null,
    seenSteps: [],
};

// Query keys
const USER_QUERY_KEY = ['user'];
const ONBOARDING_STEPS_QUERY_KEY = ['onboarding-steps'];

// Mock API functions with setTimeout to simulate network calls
const mockApi = {
    getUser: (): Promise<UserRo> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ ...mockUserData });
            }, 500);
        });
    },

    updatePersonalData: (data: { firstName: string; lastName: string }): Promise<UserRo> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockUserData = {
                    ...mockUserData,
                    firstName: data.firstName,
                    lastName: data.lastName,
                };
                resolve({ ...mockUserData });
            }, 800);
        });
    },

    addWorkExperience: (workExperience: Omit<WorkExperienceRo, 'id'>): Promise<UserRo> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newWorkExperience: WorkExperienceRo = {
                    ...workExperience,
                    id: `work-${Date.now()}`,
                };
                mockUserData = {
                    ...mockUserData,
                    workExperiences: [...mockUserData.workExperiences, newWorkExperience],
                };
                resolve({ ...mockUserData });
            }, 800);
        });
    },

    updateWorkExperience: (id: string, workExperience: Omit<WorkExperienceRo, 'id'>): Promise<UserRo> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockUserData = {
                    ...mockUserData,
                    workExperiences: mockUserData.workExperiences.map(w =>
                        w.id === id ? { ...workExperience, id } : w
                    ),
                };
                resolve({ ...mockUserData });
            }, 800);
        });
    },

    addCertification: (certification: Omit<CertificationRo, 'id'>): Promise<UserRo> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newCertification: CertificationRo = {
                    ...certification,
                    id: `cert-${Date.now()}`,
                };
                mockUserData = {
                    ...mockUserData,
                    certification: newCertification,
                };
                resolve({ ...mockUserData });
            }, 800);
        });
    },

    updateCertification: (id: string, certification: Omit<CertificationRo, 'id'>): Promise<UserRo> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockUserData = {
                    ...mockUserData,
                    certification: mockUserData.certification?.id === id
                        ? { ...certification, id }
                        : mockUserData.certification,
                };
                resolve({ ...mockUserData });
            }, 800);
        });
    },

    getOnboardingSteps: (): Promise<UserOnboardingStep[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const steps: UserOnboardingStep[] = [];

                // Personal Data Step
                const hasPersonalData = mockUserData.firstName && mockUserData.lastName;
                const hasSeenPersonalData = mockUserData.seenSteps.includes(UserOnboardingStepType.PERSONAL_DATA);
                steps.push({
                    type: UserOnboardingStepType.PERSONAL_DATA,
                    isRequired: true,
                    shouldBeShown: !hasPersonalData || !hasSeenPersonalData,
                });

                // Work Experience Step
                const hasWorkExperiences = mockUserData.workExperiences.length > 0;
                const hasSeenWorkExperience = mockUserData.seenSteps.includes(UserOnboardingStepType.WORK_EXPERIENCE);
                steps.push({
                    type: UserOnboardingStepType.WORK_EXPERIENCE,
                    isRequired: false,
                    maxToAdd: 5,
                    shouldBeShown: !hasWorkExperiences || !hasSeenWorkExperience,
                });

                // Certification Step
                const hasSeenCertification = mockUserData.seenSteps.includes(UserOnboardingStepType.CERTIFICATION);
                steps.push({
                    type: UserOnboardingStepType.CERTIFICATION,
                    isRequired: false,
                    shouldBeShown: !hasSeenCertification,
                });

                resolve(steps);
            }, 300);
        });
    },

    markAsSeen: (stepTypes: UserOnboardingStepType[]): Promise<UserRo> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                mockUserData = {
                    ...mockUserData,
                    seenSteps: [...new Set([...mockUserData.seenSteps, ...stepTypes])],
                };
                resolve({ ...mockUserData });
            }, 500);
        });
    },
};

// React Query hooks
export const useGetUser = () => {
    return useQuery({
        queryKey: USER_QUERY_KEY,
        queryFn: mockApi.getUser,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useUpdatePersonalData = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mockApi.updatePersonalData,
        onSuccess: (data) => {
            // Update the cache with the new user data
            queryClient.setQueryData(USER_QUERY_KEY, data);
        },
    });
};

export const useAddWorkExperience = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mockApi.addWorkExperience,
        onSuccess: (data) => {
            // Update the cache with the new user data
            queryClient.setQueryData(USER_QUERY_KEY, data);
        },
    });
};

export const useUpdateWorkExperience = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, workExperience }: { id: string; workExperience: Omit<WorkExperienceRo, 'id'> }) =>
            mockApi.updateWorkExperience(id, workExperience),
        onSuccess: (data) => {
            // Update the cache with the new user data
            queryClient.setQueryData(USER_QUERY_KEY, data);
        },
    });
};

export const useAddCertification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mockApi.addCertification,
        onSuccess: (data) => {
            // Update the cache with the new user data
            queryClient.setQueryData(USER_QUERY_KEY, data);
        },
    });
};

export const useUpdateCertification = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, certification }: { id: string; certification: Omit<CertificationRo, 'id'> }) =>
            mockApi.updateCertification(id, certification),
        onSuccess: (data) => {
            // Update the cache with the new user data
            queryClient.setQueryData(USER_QUERY_KEY, data);
        },
    });
};

export const useGetOnboardingSteps = () => {
    return useQuery({
        queryKey: ONBOARDING_STEPS_QUERY_KEY,
        queryFn: mockApi.getOnboardingSteps,
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

export const useMarkAsSeen = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: mockApi.markAsSeen,
        onSuccess: (data) => {
            // Update both user data and onboarding steps cache
            queryClient.setQueryData(USER_QUERY_KEY, data);
            queryClient.invalidateQueries({ queryKey: ONBOARDING_STEPS_QUERY_KEY });
        },
    });
};
