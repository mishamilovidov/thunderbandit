import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

firebase.initializeApp(firebaseConfig);

export const types = {
  UPDATE: 'UPDATE'
};

export const AppInit = {
  firebase: {
    ...{
      firestore: firebase.firestore(),
      storage: firebase.storage()
    },
    ...(process.env.REACT_APP_ENV === 'local' && {
      firestore: firebase
        .firestore()
        .useEmulator(
          'localhost',
          process.env.REACT_APP_FIREBASE_EMULATORS_FIRESTORE_PORT
        )
    }),
    ...(!process.env.REACT_APP_ENV === 'local' && {
      analytics: firebase.analytics()
    })
  },
  theme: {
    appearance: window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light',
    breakpoints: {
      xs: '600px',
      sm: '768px',
      md: '992px',
      lg: '1100px',
      xl: '1300px'
    },
    colors: {
      border: '#664d5c',
      text: '#f4f0f3'
    },
    fontFamily: "'Lato', sans-serif",
    scale: 'medium',
    widths: {
      content: {
        sm: '85vw',
        md: '800px',
        lg: '900px',
        xl: '1100px'
      }
    }
  }
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case types.UPDATE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
