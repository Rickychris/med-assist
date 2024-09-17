# Med-Assist

Med-Assist is a real-time audio medical assistant app designed to capture doctor-patient conversations, transcribe them into text, identify patient queries, and suggest potential answers based on a medical document. The app is built using React (frontend), Firebase (storage, authentication), and Google Cloud Speech-to-Text for audio transcription.

## Features
- Record audio or upload an audio file of doctor-patient conversations.
- Transcribe audio into text using Google Cloud's Speech-to-Text API.
- Identify patient queries from the transcription.
- Suggest answers based on a predefined medical document.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Firebase Functions, Google Cloud Speech-to-Text API
- **Database**: Firebase Firestore

## Installation

### Prerequisites
- Node.js installed
- Firebase CLI installed
- Google Cloud project with Speech-to-Text API enabled

### Steps to Install

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rickychris/med-assist.git
   cd med-assist

2. **Install frontend dependencies:**

    ```bash
    npm install

3. **Install Firebase function dependencies:**

    ```bash
    cd functions
    npm install
    cd ..

4. **Setup Firebase: Ensure you've initialized Firebase in the project:**

    ```bash
    firebase init

    Choose Firestore, Functions, and any other necessary options.

5. **Firebase credentials: Set up your Firebase credentials in .env files or within the Firebase console.**
    ```
        VITE_FIREBASE_API_KEY =
        VITE_FIREBASE_APP_ID = 
        VITE_FIREBASE_MSG_SENDER_ID = 
    ```

6. **Deploy Firebase Functions: Deploy the Firebase Cloud Functions using:**

    ```bash
    firebase deploy --only functions


### Usage

**Run the app locally:**
    
    npm run dev
    

**Recording or Uploading Audio:**

    Use the UI to record an audio conversation or upload an audio file.

**Transcription & Query Detection:**

    The audio file is uploaded to Firebase, then processed using Google Cloud Speech-to-Text API for transcription.
    Identified queries from the transcription will be processed, and relevant answers will be suggested based on the predefined medical document.