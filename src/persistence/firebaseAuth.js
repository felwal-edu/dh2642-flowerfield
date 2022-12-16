import log from "@/utils/logUtils";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { app } from "./firebaseModel";

const auth = getAuth(app);

export function signUpUser(email, password) {
  log.i("signing up ...");

  return createUserWithEmailAndPassword(auth, email, password);
}

export function signInUser(email, password) {
  log.i("signing in ...");

  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser() {
  log.i("signing out ...");

  auth.signOut();
}

export function observeAuthState(signedInACB, signedOutACB) {
  function stateChangedACB(credentialUser) {
    if (credentialUser) {
      log.i("signed in as: " + credentialUser.email);

      const user = {
        uid: credentialUser.uid,
        email: credentialUser.email,
      };

      signedInACB(user);
    }
    else {
      log.i("signed out");

      signedOutACB();
    }
  }

  onAuthStateChanged(auth, stateChangedACB);
}
