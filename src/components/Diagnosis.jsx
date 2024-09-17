import React, { useEffect, useState } from "react";
import { findQuestions, findRelevantAnswer } from "../utils";
import { medicalDoc } from "./medical-doc";

const Diagnosis = ({ transcription }) => {

    
  const getDiagnosis = (transcription) => {
    const questions = findQuestions(transcription);
    if (questions.length > 0) {
      const relevantAnswer = findRelevantAnswer(questions.join(' '), medicalDoc);
      return relevantAnswer;
    }
    return null;
  };
 if(transcription === undefined) return null
  return (
    <div>
      <h2>Diagnosis</h2>
      <p>{getDiagnosis(transcription)}</p>
    </div>
  );
};

export default Diagnosis;
