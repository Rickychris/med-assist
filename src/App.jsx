import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AudioRecorder from './components/Audio'
import TranscriptionDisplay from './components/Transciptions'
import storage from './firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function App() {

  const uploadAudioToFirebase = (audioBlobOrFile) => {
    const storageRef = ref(storage, `audio/${audioBlobOrFile.name || 'recorded-audio.webm'}`);
  
    const uploadTask = uploadBytesResumable(storageRef, audioBlobOrFile);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Error uploading file:", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          // You can now trigger your transcription backend
        });
      }
    );
  };

  return (
    <div className='wrap'>
      <AudioRecorder  onSave={uploadAudioToFirebase}/>
      <TranscriptionDisplay />
    </div>
  )
}

export default App
