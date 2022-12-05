import firebaseConfig from "./firebaseSecrets";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue, onChildAdded, onChildRemoved } from "firebase/database";

// init

//console.log("initializing firebase ...")

export const app = initializeApp(firebaseConfig);
const db = getDatabase();

const REF = "flowerModel";

//

export function updateUserData(user) {
  // TODO: temp?
  set(ref(db, REF + "/users/" + user.uid + "/email"), user.email);
}

export function updateFirebaseFromModel(model, uid) {
  function observeACB(payload) {
    if (!payload) return;

    if (payload.addPlant) {
      set(ref(db, REF + "/users/" + uid + "/plants/" + payload.addPlant.id), payload.addPlant);
    }
    else if (payload.removePlantId) {
      set(ref(db, REF + "/users/" + uid + "/plants/" + payload.removePlantId), null);
    }
  }

  model.addObserver(observeACB);

  return;
}

export function updateModelFromFirebase(model, uid) {
  function plantAddedInFirebase(data) {
    model.addPlant(data.val());
  }

  function plantRemovedInFirebase(data) {
    model.removePlant(+data.key);
  }

  onChildAdded(ref(db, REF + "/users/" + uid + "/plants"), plantAddedInFirebase);
  onChildRemoved(ref(db, REF + "/users/" + uid + "/plants"), plantRemovedInFirebase);

  return;
}
