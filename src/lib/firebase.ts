
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  projectId: 'studio-4584136097-9a1b7',
  appId: '1:630692456035:web:0d9a69c2d1d5b997a6fa56',
  storageBucket: 'studio-4584136097-9a1b7.firebasestorage.app',
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: 'studio-4584136097-9a1b7.firebaseapp.com',
  messagingSenderId: '630692456035',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
