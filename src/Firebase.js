import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyC2ychCx-8V5Z-JrHbxayTEFt2J54XtTv8',
  authDomain: 'time-tracker-b99e6.firebaseapp.com',
  databaseURL: 'https://time-tracker-b99e6.firebaseio.com',
  projectId: 'time-tracker-b99e6',
  storageBucket: 'time-tracker-b99e6.appspot.com',
  messagingSenderId: '938595081363',
};
firebase.initializeApp(config);
export const auth = firebase.auth();
export const database = firebase.database().ref('logs');
export const databaseRef = window.querybase.ref(firebase.database().ref().child('logs'), ['date', 'user']);
