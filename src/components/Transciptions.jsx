// TranscriptionDisplay.js
import React, { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs, deleteDoc } from "firebase/firestore"; 
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

  const clearData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "transcriptions"));
      querySnapshot.forEach(async doc => {
        await deleteDoc(doc.ref);
      })

      setTranscriptions([]);
    } catch (error) {
      console.error("Error fetching transcriptions:", error);
    }
  };

  return (
    <div>
      <h2>Transcriptions</h2>
      {transcriptions.length === 0 ? (
        <>
        <p>No transcriptions available</p>
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

      <button onClick={fetchTranscriptions}>
          Get Diagnosis
        </button>
        &nbsp;&nbsp;
      <button onClick={clearData}>
          Clear Data
        </button>

    </div>
  );
};

export default TranscriptionDisplay;
