import firebase from "firebase";
import "firebase";
import dataAccessConfig from "./dataAccessConfig";

const firebaseApp = firebase.initializeApp(dataAccessConfig);
export default firebaseApp;
