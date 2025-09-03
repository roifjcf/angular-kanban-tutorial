"use strict";
exports.__esModule = true;
exports.appConfig = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_routes_1 = require("./app.routes");
var platform_browser_1 = require("@angular/platform-browser");
var app_1 = require("@angular/fire/app");
var firestore_1 = require("@angular/fire/firestore");
exports.appConfig = {
    providers: [
        core_1.provideBrowserGlobalErrorListeners(),
        core_1.provideZonelessChangeDetection(),
        router_1.provideRouter(app_routes_1.routes), platform_browser_1.provideClientHydration(platform_browser_1.withEventReplay()),
        app_1.provideFirebaseApp(function () { return app_1.initializeApp({ projectId: "free-firebase-projects", appId: "1:961887653317:web:f25830d4b1b3c8eb688fac", storageBucket: "free-firebase-projects.firebasestorage.app", apiKey: "AIzaSyBhhBP6zvo-hExxv_SeRC3Fguj1oslUQgU", authDomain: "free-firebase-projects.firebaseapp.com", messagingSenderId: "961887653317", measurementId: "G-Y2P0FZWS7C" }); }), firestore_1.provideFirestore(function () { return firestore_1.getFirestore(); })
    ]
};
