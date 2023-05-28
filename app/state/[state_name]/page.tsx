import SuburbsInState from "@/components/SuburbsInState";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
};

let analytics;
let firestore;
if (firebaseConfig?.projectId) {
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);

    if (app.name && typeof window !== "undefined") {
        analytics = getAnalytics(app);
    }

    // Access Firebase services using shorthand notation.
    firestore = getFirestore();
}

export default function StateSuburbs() {
    return (
        <div>
            <SuburbsInState />
            <p>Test Test Test</p>
        </div>
    );
}
