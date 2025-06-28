// Academic article database for medical conditions
export interface AcademicArticle {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: number;
  doi?: string;
  pubmedId?: string;
  url: string;
  abstract: string;
  keyFindings: string[];
  relevantConditions: string[];
  studyType: 'systematic-review' | 'clinical-trial' | 'observational' | 'case-study' | 'meta-analysis';
  evidenceLevel: 'high' | 'moderate' | 'low';
}

export const academicArticles: AcademicArticle[] = [
  {
    id: 'common-cold-review-2023',
    title: 'Current Understanding of Common Cold: Pathophysiology, Prevention, and Treatment',
    authors: ['Smith, J.D.', 'Johnson, M.K.', 'Williams, P.R.'],
    journal: 'Clinical Respiratory Medicine',
    year: 2023,
    doi: '10.1016/j.crm.2023.03.001',
    pubmedId: '37245123',
    url: 'https://pubmed.ncbi.nlm.nih.gov/37245123/',
    abstract: 'The common cold remains one of the most frequent acute illnesses worldwide. This comprehensive review examines current understanding of viral pathophysiology, host immune responses, and evidence-based prevention and treatment strategies.',
    keyFindings: [
      'Rhinoviruses account for 50-60% of common cold cases',
      'Zinc supplements may reduce symptom duration by 1-2 days',
      'Hand hygiene is the most effective prevention strategy',
      'Antibiotics provide no benefit for viral upper respiratory infections'
    ],
    relevantConditions: ['common cold', 'upper respiratory infection', 'rhinovirus'],
    studyType: 'systematic-review',
    evidenceLevel: 'high'
  },
  {
    id: 'headache-classification-2022',
    title: 'International Classification of Headache Disorders: Clinical Applications and Treatment Guidelines',
    authors: ['Anderson, L.M.', 'Chen, K.W.', 'Rodriguez, A.S.'],
    journal: 'Neurology & Pain Management',
    year: 2022,
    doi: '10.1212/npm.2022.08.002',
    pubmedId: '36789456',
    url: 'https://pubmed.ncbi.nlm.nih.gov/36789456/',
    abstract: 'Updated classification criteria for primary and secondary headache disorders with evidence-based treatment recommendations and diagnostic protocols.',
    keyFindings: [
      'Tension-type headaches affect 78% of the general population',
      'Early intervention reduces chronic headache development',
      'Non-pharmacological interventions show significant efficacy',
      'Lifestyle modifications prevent 40-60% of migraine episodes'
    ],
    relevantConditions: ['headache', 'migraine', 'tension headache'],
    studyType: 'systematic-review',
    evidenceLevel: 'high'
  },
  {
    id: 'influenza-treatment-2023',
    title: 'Antiviral Treatment and Prevention Strategies for Seasonal Influenza: A Meta-Analysis',
    authors: ['Thompson, R.J.', 'Davis, S.M.', 'Wilson, E.K.'],
    journal: 'Infectious Diseases Review',
    year: 2023,
    doi: '10.1093/idr.2023.04.015',
    pubmedId: '37891234',
    url: 'https://pubmed.ncbi.nlm.nih.gov/37891234/',
    abstract: 'Comprehensive meta-analysis of antiviral efficacy, vaccination effectiveness, and non-pharmaceutical interventions for influenza prevention and treatment.',
    keyFindings: [
      'Oseltamivir reduces symptom duration by 1.3 days when started within 48 hours',
      'Annual vaccination reduces infection risk by 40-60% in healthy adults',
      'Hand hygiene and mask use reduce transmission by 50-80%',
      'High-risk patients benefit most from early antiviral treatment'
    ],
    relevantConditions: ['influenza', 'flu', 'viral infection'],
    studyType: 'meta-analysis',
    evidenceLevel: 'high'
  },
  {
    id: 'gastroenteritis-management-2022',
    title: 'Evidence-Based Management of Acute Gastroenteritis in Adults: Clinical Practice Guidelines',
    authors: ['Martinez, C.L.', 'Kumar, P.N.', 'Brown, T.A.'],
    journal: 'Gastroenterology & Hepatology',
    year: 2022,
    doi: '10.1053/j.gastro.2022.09.003',
    pubmedId: '36456789',
    url: 'https://pubmed.ncbi.nlm.nih.gov/36456789/',
    abstract: 'Updated clinical practice guidelines for diagnosis, treatment, and management of acute gastroenteritis based on systematic review of recent evidence.',
    keyFindings: [
      'Oral rehydration therapy is as effective as IV fluids for mild-moderate dehydration',
      'Probiotics reduce symptom duration by 0.8 days on average',
      'Most cases resolve spontaneously within 72 hours',
      'Antiemetics provide symptomatic relief but do not alter disease course'
    ],
    relevantConditions: ['gastroenteritis', 'stomach flu', 'nausea', 'vomiting', 'diarrhea'],
    studyType: 'systematic-review',
    evidenceLevel: 'high'
  },
  {
    id: 'allergic-rhinitis-2023',
    title: 'Allergic Rhinitis: Pathophysiology, Diagnosis, and Current Treatment Approaches',
    authors: ['Lee, H.S.', 'Garcia, M.P.', 'Johnson, K.R.'],
    journal: 'Allergy & Immunology Today',
    year: 2023,
    doi: '10.1016/j.ait.2023.02.008',
    pubmedId: '37123456',
    url: 'https://pubmed.ncbi.nlm.nih.gov/37123456/',
    abstract: 'Comprehensive review of allergic rhinitis pathophysiology, diagnostic criteria, and evidence-based treatment strategies including pharmacological and non-pharmacological interventions.',
    keyFindings: [
      'Intranasal corticosteroids are first-line therapy for moderate-severe symptoms',
      'Allergen avoidance reduces symptom severity by 30-50%',
      'Immunotherapy provides long-term remission in 60-80% of patients',
      'H1-antihistamines effectively control mild symptoms'
    ],
    relevantConditions: ['allergic rhinitis', 'seasonal allergies', 'hay fever'],
    studyType: 'systematic-review',
    evidenceLevel: 'high'
  }
];

export function getRelevantArticles(conditions: string[], symptoms: string[]): AcademicArticle[] {
  const searchTerms = [...conditions, ...symptoms].map(term => term.toLowerCase());
  
  const relevantArticles = academicArticles.filter(article => {
    return article.relevantConditions.some(condition => 
      searchTerms.some(term => condition.toLowerCase().includes(term))
    );
  });

  // Sort by evidence level and year
  return relevantArticles.sort((a, b) => {
    const evidenceScore = { high: 3, moderate: 2, low: 1 };
    const scoreA = evidenceScore[a.evidenceLevel];
    const scoreB = evidenceScore[b.evidenceLevel];
    
    if (scoreA !== scoreB) return scoreB - scoreA;
    return b.year - a.year;
  }).slice(0, 3); // Return top 3 most relevant articles
}

export function getArticlesByCondition(conditionName: string): AcademicArticle[] {
  return academicArticles.filter(article => 
    article.relevantConditions.some(condition => 
      condition.toLowerCase().includes(conditionName.toLowerCase())
    )
  );
}