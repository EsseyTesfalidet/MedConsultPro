// Medical condition data for symptom matching
export interface MedicalCondition {
  id: string;
  name: string;
  category: string;
  symptoms: string[];
  commonTreatments: string[];
  urgencyLevel: 'low' | 'moderate' | 'high';
  description: string;
}

export const medicalConditions: MedicalCondition[] = [
  {
    id: 'common-cold',
    name: 'Common Cold',
    category: 'Respiratory',
    symptoms: ['runny nose', 'cough', 'sore throat', 'mild fever', 'fatigue', 'sneezing'],
    commonTreatments: [
      'Get plenty of rest',
      'Stay hydrated with fluids', 
      'Use throat lozenges for sore throat',
      'Consider over-the-counter pain relievers'
    ],
    urgencyLevel: 'low',
    description: 'A viral infection of the upper respiratory tract that is generally harmless.'
  },
  {
    id: 'influenza',
    name: 'Influenza (Flu)',
    category: 'Respiratory',
    symptoms: ['high fever', 'body aches', 'fatigue', 'cough', 'headache', 'chills'],
    commonTreatments: [
      'Rest and stay hydrated',
      'Antiviral medications if within 48 hours',
      'Over-the-counter fever reducers',
      'Avoid contact with others'
    ],
    urgencyLevel: 'moderate',
    description: 'A viral infection that attacks the respiratory system and can cause serious complications.'
  },
  {
    id: 'tension-headache',
    name: 'Tension Headache',
    category: 'Neurological',
    symptoms: ['headache', 'tight band feeling', 'neck tension', 'mild to moderate pain'],
    commonTreatments: [
      'Over-the-counter pain relievers',
      'Stress management techniques',
      'Regular sleep schedule',
      'Stay hydrated'
    ],
    urgencyLevel: 'low',
    description: 'The most common type of headache, often related to stress or tension.'
  },
  {
    id: 'migraine',
    name: 'Migraine',
    category: 'Neurological', 
    symptoms: ['severe headache', 'nausea', 'light sensitivity', 'sound sensitivity', 'visual disturbances'],
    commonTreatments: [
      'Rest in dark, quiet room',
      'Prescribed migraine medications',
      'Cold or warm compress',
      'Avoid known triggers'
    ],
    urgencyLevel: 'moderate',
    description: 'A neurological condition characterized by intense, debilitating headaches.'
  },
  {
    id: 'gastroenteritis',
    name: 'Gastroenteritis',
    category: 'Digestive',
    symptoms: ['nausea', 'vomiting', 'diarrhea', 'stomach cramps', 'mild fever'],
    commonTreatments: [
      'Stay hydrated with clear fluids',
      'BRAT diet (Bananas, Rice, Applesauce, Toast)',
      'Avoid dairy and fatty foods',
      'Rest until symptoms improve'
    ],
    urgencyLevel: 'moderate',
    description: 'Inflammation of the stomach and intestines, usually caused by infection.'
  },
  {
    id: 'allergic-rhinitis',
    name: 'Seasonal Allergies (Allergic Rhinitis)',
    category: 'Allergic',
    symptoms: ['runny nose', 'sneezing', 'itchy eyes', 'nasal congestion', 'postnasal drip'],
    commonTreatments: [
      'Antihistamines',
      'Nasal decongestants',
      'Avoid known allergens',
      'Use air purifiers'
    ],
    urgencyLevel: 'low',
    description: 'An allergic reaction to airborne substances like pollen, dust, or pet dander.'
  }
];

export const symptomKeywords = {
  'respiratory': ['cough', 'runny nose', 'sore throat', 'congestion', 'sneezing'],
  'pain': ['headache', 'body aches', 'stomach pain', 'chest pain', 'back pain'],
  'fever': ['fever', 'chills', 'hot', 'temperature'],
  'digestive': ['nausea', 'vomiting', 'diarrhea', 'stomach', 'appetite'],
  'neurological': ['headache', 'dizziness', 'confusion', 'vision'],
  'fatigue': ['tired', 'fatigue', 'weakness', 'exhausted']
};

export function matchSymptoms(userSymptoms: string, additionalSymptoms: string[] = []): MedicalCondition[] {
  const allSymptoms = [userSymptoms, ...additionalSymptoms].join(' ').toLowerCase();
  
  const matches = medicalConditions.map(condition => {
    let score = 0;
    
    condition.symptoms.forEach(symptom => {
      if (allSymptoms.includes(symptom.toLowerCase())) {
        score += 1;
      }
    });
    
    return {
      condition,
      score,
      matchPercentage: Math.min(Math.round((score / condition.symptoms.length) * 100), 100)
    };
  }).filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score);
  
  return matches.slice(0, 3).map(match => ({
    ...match.condition,
    matchPercentage: match.matchPercentage
  })) as (MedicalCondition & { matchPercentage: number })[];
}
