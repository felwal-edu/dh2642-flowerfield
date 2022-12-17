import log from "@/utils/logUtils";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, deleteUser } from "firebase/auth";
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

  return auth.signOut();
}

export function removeUser(user) {
  log.i("Removing user ...", auth.currentUser);

  deleteUser(auth.currentUser).then(() => {
    log.i("user removed");
  }).catch((error) => {
    log.e("error removing user", error);

    // NOTE: we might get an error here if the user
    // signed in a long time ago. In that case we would
    // need to re-authenticate the user.

    // TODO: re-authenticate the user
  });
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
