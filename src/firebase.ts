import admin from 'firebase'
import { firebaseConfig } from "./constants";

export const firebaseApp = admin.initializeApp(firebaseConfig);
