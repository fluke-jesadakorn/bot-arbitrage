import { firebaseConfig } from './config'
import * as firebase from 'firebase/app';
import 'firebase/firebase-database';
import 'firebase/auth';

if (!firebase.apps.length) {
  try {
    firebase.initializeApp(firebaseConfig);
  } catch (e) {
    console.error(e)
  }
}

export const adminSignup = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email + '@test.com', password).then(state => {
        console.log(state)
    }).catch(e => console.error(e))
}

export const adminSignIn = (email, password) => {
    firebase.auth().signInWithEmailAndPassword(email + '@test.com', password).then(state => {
        console.log(state)
    })
}

export const adminSignout = () => {
    firebase.auth().signOut().then(() => {
        console.log("signOut")
    })
}

const Null = () => {
    return (<></>) // When build need to Default export
}
export default Null