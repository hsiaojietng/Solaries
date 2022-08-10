// Load bulma styles in the main entry point before all else
import "bulma/css/bulma.min.css";

// Import API library first to set default base URL before it is used anywhere else
import { oof } from "simpler-fetch";

// If you would like to commit your base API URL with source code, use this to specify different URLs
oof._baseUrl =
  import.meta.env.MODE === "production"
    ? "https://api.example.com"
    : "http://localhost:3000";

// Else use this to read a single URL from the .env file
// oof._baseUrl = import.meta.env.VITE_API_URL;

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBp9-CwzTMSyPV6M0Xl0Vv4AvWyuai-fo8",
  authDomain: "solaries-3bcb4.firebaseapp.com",
  projectId: "solaries-3bcb4",
  storageBucket: "solaries-3bcb4.appspot.com",
  messagingSenderId: "1097502896553",
  appId: "1:1097502896553:web:54c1ed1a1ecfc00010d4b8",
  measurementId: "G-VQLMR5RB12",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import router from "./router/index";
import App from "./App.vue";
import './Axios.js'

// Create new vue app
createApp(App)
  .use(router)
  .use(createPinia().use(piniaPluginPersistedstate))
  .mount("#app");

  export {app, db}