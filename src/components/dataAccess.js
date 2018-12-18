import firebase from "firebase";
import "firebase";
import dataAccessDefaultConfig from "./dataAccessDefaultConfig";

const firebaseApp = firebase.initializeApp(dataAccessDefaultConfig);
export default firebaseApp;
