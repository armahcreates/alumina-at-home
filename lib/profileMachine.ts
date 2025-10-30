import { createMachine, assign } from 'xstate';
import { Profile } from './db';

export interface ProfileContext {
  profile: Profile | null;
  error: string | null;
  editedProfile: Partial<Profile> | null;
}

export type ProfileEvent =
  | { type: 'FETCH' }
  | { type: 'EDIT'; data: Partial<Profile> }
  | { type: 'SAVE' }
  | { type: 'CANCEL' }
  | { type: 'SUCCESS'; data: Profile }
  | { type: 'ERROR'; error: string };

export const profileMachine = createMachine({
  id: 'profile',
  initial: 'idle',
  types: {} as {
    context: ProfileContext;
    events: ProfileEvent;
  },
  context: {
    profile: null,
    error: null,
    editedProfile: null,
  },
  states: {
    idle: {
      on: {
        FETCH: 'loading',
        EDIT: {
          target: 'editing',
          actions: assign({
            editedProfile: ({ context, event }) => ({
              ...context.profile,
              ...(event as { type: 'EDIT'; data: Partial<Profile> }).data,
            }),
          }),
        },
      },
    },
    loading: {
      invoke: {
        src: 'fetchProfile',
        onDone: {
          target: 'idle',
          actions: assign({
            profile: ({ event }) => event.output,
            error: null,
          }),
        },
        onError: {
          target: 'error',
          actions: assign({
            error: ({ event }) => {
              const error = event.error as Error | undefined;
              return error?.message || 'Failed to load profile';
            },
          }),
        },
      },
    },
    editing: {
      on: {
        EDIT: {
          actions: assign({
            editedProfile: ({ context, event }) => ({
              ...context.editedProfile,
              ...(event as { type: 'EDIT'; data: Partial<Profile> }).data,
            }),
          }),
        },
        SAVE: 'saving',
        CANCEL: {
          target: 'idle',
          actions: assign({
            editedProfile: null,
            error: null,
          }),
        },
      },
    },
    saving: {
      invoke: {
        src: 'saveProfile',
        onDone: {
          target: 'idle',
          actions: assign({
            profile: ({ event }) => event.output,
            editedProfile: null,
            error: null,
          }),
        },
        onError: {
          target: 'error',
          actions: assign({
            error: ({ event }) => {
              const error = event.error as Error | undefined;
              return error?.message || 'Failed to save profile';
            },
          }),
        },
      },
    },
    error: {
      on: {
        FETCH: 'loading',
        EDIT: {
          target: 'editing',
          actions: assign({
            error: null,
            editedProfile: ({ context, event }) => ({
              ...context.profile,
              ...(event as { type: 'EDIT'; data: Partial<Profile> }).data,
            }),
          }),
        },
      },
    },
  },
});

// Service implementations
export const profileServices = {
  fetchProfile: async ({ userId }: { userId: string }): Promise<Profile> => {
    const response = await fetch(`/api/profile/update?userId=${userId}`);
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch profile');
    }
    
    const result = await response.json();
    return result.data;
  },

  saveProfile: async ({ 
    userId, 
    profileData 
  }: { 
    userId: string; 
    profileData: Partial<Profile> 
  }): Promise<Profile> => {
    const response = await fetch('/api/profile/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        ...profileData,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to save profile');
    }

    const result = await response.json();
    return result.data;
  },
};