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

export const SYMPTOMS_DATA: Record<string, SymptomConfig> = {
  fever: {
    id: "fever",
    title: "Fever",
    category: "General",
    questions: [
      {
        id: "fever_temp",
        text: "How high is the fever?",
        options: [
          { id: "hot", label: "Extremely hot to touch", isRedFlag: true },
          { id: "warm", label: "Slightly warm", isRedFlag: false },
          { id: "unsure", label: "I am not sure", isRedFlag: false },
        ],
      },
      {
        id: "fever_duration",
        text: "How long have you had the fever or felt unusually hot?",
        options: [
          { id: "today", label: "Started today", isRedFlag: false },
          { id: "days_2_3", label: "2-3 days ago", isRedFlag: false },
          { id: "days_3_plus", label: "More than 3 days", isRedFlag: true },
        ],
      },
      {
        id: "fever_unwell",
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
        id: "headache_onset",
        text: "Did the headache start suddenly and become extremely painful?",
        options: [
          { id: "yes", label: "Yes", isRedFlag: true },
          { id: "no", label: "No", isRedFlag: false },
        ],
      },
      {
        id: "headache_associated",
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
      {
        id: "headache_severity",
        text: "Is this headache new or much worse than headaches you normally get?",
        options: [
          { id: "yes", label: "Yes", isRedFlag: true },
          { id: "no", label: "No", isRedFlag: false },
        ],
      },
    ],
  },
  cough: {
    id: "cough",
    title: "Cough",
    category: "Respiratory",
    questions: [
      {
        id: "cough_breathing",
        text: "Are you struggling to breathe?",
        options: [
          { id: "no", label: "No", isRedFlag: false },
          {
            id: "mild",
            label: "A little more difficult than usual",
            isRedFlag: false,
          },
          { id: "struggling", label: "Yes, I am struggling", isRedFlag: true },
        ],
      },
      {
        id: "cough_duration",
        text: "How long have you been coughing?",
        options: [
          { id: "under_1_wk", label: "Less than 1 week", isRedFlag: false },
          { id: "wks_1_3", label: "1-3 weeks", isRedFlag: false },
          { id: "over_3_wks", label: "More than 3 weeks", isRedFlag: true },
        ],
      },
      {
        id: "cough_symptoms",
        text: "Do you have any of these?",
        options: [
          { id: "blood", label: "Coughing blood", isRedFlag: true },
          { id: "high_fever", label: "Very high fever", isRedFlag: true },
          { id: "none", label: "None", isRedFlag: false },
        ],
      },
    ],
  },
  body_pain: {
    id: "body_pain",
    title: "Body Pain",
    category: "General",
    questions: [
      {
        id: "pain_mobility",
        text: "Can you still walk and do your normal activities?",
        options: [
          { id: "yes", label: "Yes", isRedFlag: false },
          { id: "difficulty", label: "With difficulty", isRedFlag: false },
          {
            id: "too_weak",
            label: "No, I am too weak to walk normally",
            isRedFlag: true,
          },
        ],
      },
      {
        id: "pain_trauma",
        text: "Did the pain start suddenly after an accident, fall or injury?",
        options: [
          { id: "yes", label: "Yes", isRedFlag: true },
          { id: "no", label: "No", isRedFlag: false },
        ],
      },
    ],
  },
  diarrhoea: {
    id: "diarrhoea",
    title: "Diarrhoea",
    category: "Gastrointestinal",
    questions: [
      {
        id: "diarrhoea_fluids",
        text: "Are you able to drink and keep fluids down?",
        options: [
          {
            id: "small_amounts",
            label: "Yes, I can drink only small amounts",
            isRedFlag: false,
          },
          { id: "vomiting", label: "No, I keep vomiting", isRedFlag: true },
        ],
      },
      {
        id: "diarrhoea_blood",
        text: "Have you seen blood in the stool?",
        options: [
          { id: "no", label: "No", isRedFlag: false },
          { id: "yes", label: "Yes", isRedFlag: true },
        ],
      },
      {
        id: "diarrhoea_associated",
        text: "Do you also have severe stomach pain, fainting, confusion or difficulty breathing?",
        options: [
          { id: "no", label: "No", isRedFlag: false },
          { id: "one_or_more", label: "One or more", isRedFlag: true },
        ],
      },
    ],
  },
  rash: {
    id: "rash",
    title: "Rash",
    category: "Dermatological",
    questions: [
      {
        id: "rash_onset",
        text: "Did the rash appear suddenly and spread quickly?",
        options: [
          { id: "no", label: "No", isRedFlag: false },
          { id: "yes", label: "Yes", isRedFlag: false },
        ],
      },
      {
        id: "rash_associated",
        text: "Do you have a very bad headache, stiff neck, confusion, severe weakness or very high fever with the rash?",
        options: [
          { id: "yes", label: "Yes", isRedFlag: true },
          { id: "no", label: "No", isRedFlag: false },
        ],
      },
    ],
  },
  difficulty_breathing: {
    id: "difficulty_breathing",
    title: "Difficulty Breathing",
    category: "Respiratory",
    questions: [
      {
        id: "breathing_severity",
        text: "How difficult is it to breathe right now?",
        options: [
          { id: "normal", label: "I can breathe normally", isRedFlag: false },
          {
            id: "short_breath",
            label: "I am more short of breath than usual",
            isRedFlag: true,
          },
          {
            id: "struggling",
            label: "I am struggling/gasping/cannot speak normally",
            isRedFlag: true,
          },
        ],
      },
      {
        id: "breathing_onset",
        text: "Did the breathing problem start suddenly?",
        options: [
          { id: "yes", label: "Yes", isRedFlag: false },
          { id: "no", label: "No", isRedFlag: false },
        ],
      },
      {
        id: "breathing_associated",
        text: "Do you also have chest pain, fainting, blue/grey lips, severe weakness or confusion?",
        options: [
          { id: "none", label: "None", isRedFlag: false },
          { id: "one_or_more", label: "One or more", isRedFlag: true },
        ],
      },
    ],
  },
  chest_pain: {
    id: "chest_pain",
    title: "Chest Pain",
    category: "Cardiovascular",
    questions: [
      {
        id: "chest_timing",
        text: "Is the pain happening now?",
        options: [
          { id: "no", label: "No", isRedFlag: false },
          { id: "yes", label: "Yes", isRedFlag: false },
        ],
      },
      {
        id: "chest_character",
        text: "Does the pain feel like pressure, squeezing, heaviness or tightness, or spread to your arm, back, neck or jaw?",
        options: [
          { id: "no", label: "No", isRedFlag: false },
          { id: "yes", label: "Yes", isRedFlag: true },
        ],
      },
      {
        id: "chest_associated",
        text: "Do you also have difficulty breathing, sweating, vomiting, fainting or feeling like you may collapse?",
        options: [
          { id: "none", label: "None", isRedFlag: false },
          { id: "one_or_more", label: "One or more", isRedFlag: true },
        ],
      },
    ],
  },
  abdominal_pain: {
    id: "abdominal_pain",
    title: "Abdominal Pain",
    category: "Gastrointestinal",
    questions: [
      {
        id: "abdo_associated",
        text: "Do you have any of these?",
        options: [
          { id: "vomiting", label: "Repeated Vomiting", isRedFlag: false },
          {
            id: "blood_vomit_stool",
            label: "Blood in vomit/stool",
            isRedFlag: true,
          },
          {
            id: "fainting_collapse",
            label: "Fainting/collapse",
            isRedFlag: true,
          },
          {
            id: "swollen_stomach",
            label: "Very swollen or hard stomach",
            isRedFlag: true,
          },
        ],
      },
      {
        id: "abdo_severity",
        text: "Is the pain getting worse or stopping you from doing normal activities?",
        options: [
          { id: "no", label: "No", isRedFlag: false },
          { id: "yes", label: "Yes", isRedFlag: true },
        ],
      },
    ],
  },
  fatigue: {
    id: "fatigue",
    title: "Fatigue / Unusual Weakness",
    category: "General",
    questions: [
      {
        id: "fatigue_impact",
        text: "How is the weakness affecting you?",
        options: [
          {
            id: "normal",
            label: "I can do my normal activities",
            isRedFlag: false,
          },
          {
            id: "struggling",
            label: "I am struggling with normal activities",
            isRedFlag: false,
          },
          {
            id: "cannot_walk",
            label: "I cannot stand/walk or do basic activities",
            isRedFlag: true,
          },
        ],
      },
      {
        id: "fatigue_associated",
        text: "Do you also have chest pain, difficulty breathing, fainting, confusion or severe bleeding?",
        options: [
          { id: "no", label: "No", isRedFlag: false },
          { id: "one_or_more", label: "One or more", isRedFlag: true },
        ],
      },
    ],
  },
};
