import firebaseConfig from "./firebaseSecrets";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import { examplePlant } from "../network/plantIdServiceMock";

// init

//console.log("initializing firebase ...")

export const app = initializeApp(firebaseConfig);
const db = getDatabase();

const REF = "flowerModel";

// (temp) check that the database is correctly initialized
set(ref(db, REF + "/test"), "dummy");
set(ref(db, REF + "/users/0"), "test");

//

export function createUser(user) {
  // TODO: temp
  set(ref(db, REF + "/users/" + user.uid + "/email"), user.email);
  set(ref(db, REF + "/users/" + user.uid + "/plants"), [examplePlant]);
}

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
