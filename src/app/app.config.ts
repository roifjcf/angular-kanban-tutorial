import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp({ projectId: "free-firebase-projects", appId: "1:961887653317:web:f25830d4b1b3c8eb688fac", storageBucket: "free-firebase-projects.firebasestorage.app", apiKey: "AIzaSyBhhBP6zvo-hExxv_SeRC3Fguj1oslUQgU", authDomain: "free-firebase-projects.firebaseapp.com", messagingSenderId: "961887653317", measurementId: "G-Y2P0FZWS7C" })), provideFirestore(() => getFirestore())
  ]
};
