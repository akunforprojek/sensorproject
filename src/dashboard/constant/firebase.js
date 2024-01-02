import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC2C-h1lq04SweCpeAEAlrHHG7erADcoHo",
  authDomain: "arduino-project-192d4.firebaseapp.com",
  projectId: "arduino-project-192d4",
  storageBucket: "arduino-project-192d4.appspot.com",
  messagingSenderId: "1074671646798",
  appId: "1:1074671646798:web:346db40a53e015bc096b1f"
};

const app = initializeApp(firebaseConfig);

export default getFirestore(app);