import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

export const firebase = initializeApp(firebaseConfig);
export const storage = getStorage(firebase);
export const imagesRef = ref(storage, "images");
export const uploadImage = (project: string, file: Express.Multer.File) => {
  const projectRef = ref(imagesRef, project);
  const imageRef = ref(projectRef, file.originalname);
  return uploadBytes(imageRef, file.buffer);
};
export const getImageUrl = (project: string, image: string) => {
  const projectRef = ref(imagesRef, project);
  const imageRef = ref(projectRef, image);
  return getDownloadURL(imageRef);
};
