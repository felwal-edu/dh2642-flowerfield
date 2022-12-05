import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseModel";

const auth = getAuth(app);

export function signUpUser(email, password) {
  console.log("signing up ...");

  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInUser(email, password) {
  console.log("signing in ...");

  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  console.log("signing out ...");

  auth.signOut();
}

export function observeAuthState(signedInACB, signedOutACB) {
  function stateChangedACB(credentialUser) {
    if (credentialUser) {
      console.log("signed in");

      const user = {
        uid: credentialUser.uid,
        email: credentialUser.email,
      };

      signedInACB(user);
    }
    else {
      console.log("signed out");

      signedOutACB();
    }
  }

  onAuthStateChanged(auth, stateChangedACB);
}
