export interface Option {
  id: string;
  label: string;
  isRedFlag: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: Option[];
}

export interface SymptomConfig {
  id: string;
  title: string;
  category: string;
  questions: Question[];
}

// data/symptoms.ts
export const SYMPTOMS_DATA: Record<string, SymptomConfig> = {
  fever: {
    id: "fever",
    title: "Fever",
    category: "General",
    questions: [
      {
        id: "temp",
        text: "How high is the fever?",
        options: [
          { id: "hot", label: "Extremely hot to touch", isRedFlag: true },
          { id: "warm", label: "Slightly warm", isRedFlag: false },
          { id: "unsure", label: "I am not sure", isRedFlag: false },
        ],
      },
      {
        id: "duration",
        text: "How long have you had the fever or felt unusually hot?",
        options: [
          { id: "today", label: "Started today", isRedFlag: false },
          { id: "days_2_3", label: "2-3 days ago", isRedFlag: false },
          { id: "days_3_plus", label: "More than 3 days", isRedFlag: true },
        ],
      },
      {
        id: "unwell",
        text: "Apart from the fever, do you feel seriously unwell?",
        options: [
          {
            id: "normal",
            label: "No, I can still do normal activities",
            isRedFlag: false,
          },
          {
            id: "weak",
            label: "I feel weak and cannot do much",
            isRedFlag: false,
          },
          {
            id: "severe_weak",
            label: "I am very weak, confused, or having a fit",
            isRedFlag: true,
          },
        ],
      },
    ],
  },
  headache: {
    id: "headache",
    title: "Headache",
    category: "Neurological",
    questions: [
      {
        id: "onset",
        text: "Did the headache start suddenly and become extremely painful?",
        options: [
          { id: "yes", label: "Yes", isRedFlag: true },
          { id: "no", label: "No", isRedFlag: false },
        ],
      },
      {
        id: "associated",
        text: "Do you also have any of these?",
        options: [
          {
            id: "speech_movement",
            label: "Trouble speaking/moving",
            isRedFlag: true,
          },
          {
            id: "fainting_confusion",
            label: "Fainting/confusion",
            isRedFlag: true,
          },
          { id: "stiff_neck", label: "Stiff neck", isRedFlag: true },
          { id: "vision", label: "Vision problems", isRedFlag: true },
          { id: "none", label: "None", isRedFlag: false },
        ],
      },
    ],
  },
  // ... Extend for Cough, Chest Pain, Abdominal Pain, etc.
};
