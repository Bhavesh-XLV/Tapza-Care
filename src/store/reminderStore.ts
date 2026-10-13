import { create } from 'zustand';

interface ReminderState {
  takenDoses: Record<string, boolean>;

  toggleDose: (medicineId: string, timing: string) => void;

  isDoseTaken: (medicineId: string, timing: string) => boolean;
}

function createDoseKey(medicineId: string, timing: string): string {
  return `${medicineId}-${timing}`;
}

export const useReminderStore = create<ReminderState>((set, get) => ({
  takenDoses: {},

  toggleDose: (medicineId, timing) => {
    const key = createDoseKey(medicineId, timing);

    set(state => ({
      takenDoses: {
        ...state.takenDoses,
        [key]: !state.takenDoses[key],
      },
    }));
  },

  isDoseTaken: (medicineId, timing) => {
    const key = createDoseKey(medicineId, timing);

    return Boolean(get().takenDoses[key]);
  },
}));
