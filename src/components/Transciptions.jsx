// TranscriptionDisplay.js
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore"; 
import { db } from "../firebase";  // Import Firestore instance
import Diagnosis from "./Diagnosis";

/**
 * A React component that fetches a list of transcriptions from Firestore
 * and displays them in an unordered list.
 *
 * The component fetches the list of transcriptions on mount and displays
 * a message if no transcriptions are available.
 *
 * Each transcription is displayed as a list item with the transcription text
 * and the timestamp of the transcription. The timestamp is formatted as a
 * localized string.
 *
 * The component also renders a Diagnosis component.
 */
const TranscriptionDisplay = () => {
  const [transcriptions, setTranscriptions] = useState([]);


  const fetchTranscriptions = async () => {
    try {
      const q = query(collection(db, "transcriptions"), orderBy("timestamp", "desc"), limit(1));
      const querySnapshot = await getDocs(q);
      const transcriptionList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTranscriptions(transcriptionList);

    } catch (error) {
      console.error("Error fetching transcriptions:", error);
    }
  };

  useEffect(() => {

    fetchTranscriptions();
  }, []);

  return (
    <div>
      <h2>Transcriptions</h2>
      {transcriptions.length === 0 ? (
        <>
        <p>No transcriptions available</p>
        <button onClick={fetchTranscriptions}>
          Get Diagnosis
        </button>
        </>
      ) : (
        <ul>
          {transcriptions.map((transcription) => (
            <li key={transcription.id}>
              <strong>Transcription:</strong> {transcription.transcription} <br />
              <small>{new Date(transcription.timestamp?.seconds * 1000).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      )}
      <Diagnosis transcription={transcriptions[0]?.transcription} />

    </div>
  );
};

export default TranscriptionDisplay;
