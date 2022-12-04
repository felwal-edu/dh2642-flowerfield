import firebaseConfig from "./firebaseSecrets";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";

//console.log("initializing firebase ...")

// Initialize firebase
const firebase = initializeApp(firebaseConfig);
const db = getDatabase();

// (temp) check that the database is correctly initialized
set(ref(db, "/test"), "dummy");

//

export function updateFirebaseFromModel(model) {
  function observeACB(payload) {
    if (!payload) return;

    // TODO
  }

  model.addObserver(observeACB);

  return;
}

export function updateModelFromFirebase(model) {
  // TODO

  //firebase.database().ref(REF + "/TODO").on("child_removed", TODO);

  return;
}
