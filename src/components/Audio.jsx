import React, { useState, useEffect } from "react";

const AudioRecorder = ({ onSave }) => {
  const [recorder, setRecorder] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioFile, setAudioFile] = useState(null);

  useEffect(() => {
    // Set up audio recorder when the component is mounted
    if (recorder === null) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const newRecorder = new MediaRecorder(stream);
          setRecorder(newRecorder);
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    }
  }, [recorder]);

  const startRecording = () => {
    if (recorder) {
      recorder.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
      recorder.ondataavailable = (e) => {
        const audioBlob = new Blob([e.data], { type: "audio/wav" });
        setAudioUrl(URL.createObjectURL(audioBlob));
        onSave(audioBlob); // Pass the blob for further processing or saving
      };
      setIsRecording(false);
    }
  };

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    setAudioFile(file);
    onSave(file); // Pass the uploaded file for processing or saving
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h3>Simulated Doctor-Patient Conversation</h3>

      <div>
        <h4>Capture Audio via Microphone</h4>
        <button onClick={startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
        {audioUrl && (
          <div>
            <h5>Recorded Audio</h5>
            <audio controls src={audioUrl}></audio>
          </div>
        )}
      </div>

      <hr />

      <div>
        <h4>Or Upload an Audio File</h4>
        <input type="file" accept="audio/*" onChange={handleAudioFileChange} />
        {audioFile && (
          <div>
            <h5>Uploaded Audio</h5>
            <audio controls src={URL.createObjectURL(audioFile)}></audio>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioRecorder;
