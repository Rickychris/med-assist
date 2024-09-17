
export function findQuestions(transcription) {
  const questionWords = ['what', 'who', 'where', 'when', 'why', 'how', 'which', 'whom', 'whose'];

  const sentences = transcription.split(/[.?!]/);  // Split on sentence terminators
  const questions = sentences.filter(sentence =>
    sentence.trim().endsWith('?') ||
    questionWords.some(word => sentence.toLowerCase().includes(word))
  );
  return questions;
}


export function findRelevantAnswer(question, document) {
  // const keywords = ['headache', 'medication', 'treatment']; // Extracted key terms
  const keywords = question.split(' ');
  const relevantDiagnosis = document.filter(diagnosis => {
    const diagnosisKeywords = diagnosis.symptoms.map(symptom => symptom.toLowerCase());
    return keywords.some(keyword => diagnosisKeywords.includes(keyword));
  })

  if (relevantDiagnosis.length === 0) {
    return null;
  }

  const relevantSentences = relevantDiagnosis[0].name + ',\n ' + relevantDiagnosis[0].diagnosis;

  return relevantSentences;
}
