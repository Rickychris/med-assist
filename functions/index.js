// functions/index.js
import functions from "firebase-functions";
import admin from "firebase-admin";
import { SpeechClient } from "@google-cloud/speech";

admin.initializeApp();
const speechClient = new SpeechClient();

export const transcribeAudio = functions.storage.object().onFinalize(async (object) => {
    // Get the file's URI
    const fileBucket = object.bucket;
    const filePath = object.name;
    const contentType = object.contentType;

    console.log(`DEBUG__File bucket: ${fileBucket}`);
    console.log(`DEBUG__File path: ${filePath}`);
    console.log(`DEBUG__File content type: ${contentType}`);

    // Check if this is an audio file
    if (!contentType.startsWith('audio/')) {
        console.log('This is not an audio file.');
        return null;
    }




    const gcsUri = `gs://${object.bucket}/${object.name}`;

    // Configure the audio settings
    const audio = { uri: gcsUri };
    let config;

    if (contentType === "audio/flac") {
        config = {
            encoding: "FLAC",
            languageCode: "en-US",
        };
    } else if (contentType === "audio/webm") {
        config = {
            encoding: "WEBM_OPUS",
            languageCode: "en-US",
            sampleRateHertz: 48000,
        }
    } else {
        console.log("Unsupported audio format.");
        return null;
    }

    config.model = "medical_conversation";
    config.useEnhanced = true;

    // Create the request for the Speech-to-Text API
    const request = { audio, config };

    console.log(`DEBUG__Request: ${JSON.stringify(request)}`);


    try {
        // Call the Speech-to-Text API
        const [response] = await speechClient.recognize(request);
        console.log("Transcription results:", response);
        const transcription = response.results
            .map((result) => result.alternatives[0].transcript)
            .join("\n");

        console.log(`Transcription: ${transcription}`);

        // Store the transcription in Firestore
        await admin.firestore().collection("transcriptions").add({
            transcription,
            timestamp: admin.firestore.FieldValue.serverTimestamp(),
        });
    } catch (error) {
        console.error("Error transcribing audio:", error);
    }
});
