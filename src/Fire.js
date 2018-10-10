import firebase from "firebase";

var config = {
  apiKey: "AIzaSyC2ychCx-8V5Z-JrHbxayTEFt2J54XtTv8",
  authDomain: "time-tracker-b99e6.firebaseapp.com",
  databaseURL: "https://time-tracker-b99e6.firebaseio.com",
  projectId: "time-tracker-b99e6",
  storageBucket: "",
  messagingSenderId: "938595081363"
};
const fire = firebase.initializeApp(config);
export default fire;