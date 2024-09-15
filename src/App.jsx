import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AudioRecorder from './components/Audio'
import storage from './firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function App() {

  const uploadAudioToFirebase = (audioBlobOrFile) => {
    const storageRef = ref(storage, `audio/${audioBlobOrFile.name || 'recorded-audio.wav'}`);
  
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
  
  const handleAudioFileChange = (e) => {
    debugger
    const file = e.target.files[0];
    uploadAudioToFirebase(file);
  }  
  return (
    <>
      <AudioRecorder  onSave={uploadAudioToFirebase} />
    </>
  )
}

export default App
