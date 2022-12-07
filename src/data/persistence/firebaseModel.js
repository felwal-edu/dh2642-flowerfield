import firebaseConfig from "./firebaseSecrets";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onChildAdded, onChildRemoved, get, child } from "firebase/database";
import useFlowerStore from "../flowerStore";

// init

console.log("initializing firebase ...")

export const app = initializeApp(firebaseConfig);
const db = getDatabase();

const REF = "flowerModel";

let unsubscribers = [];

//

export function createUser(user) {
  set(ref(db, REF + "/users/" + user.uid + "/email"), user.email);
}

export function updateFirebaseFromStore(store) {
  console.log("updateFirebaseFromStore")

  function dataChangedInStoreACB(mutation, state) {
    //console.log("mutation:");
    //console.log(mutation);
    //console.log("state:");
    //console.log(state);

    // check if nothing has changed
    //if (!mutation.events) return;

    function toIdKeyedObjectCB(obj, plant) {
      return {...obj, [plant.scientificName]: plant};
    }

    //console.log(mutation.events.key);

    /*if (mutation.events.key === "plants") {
      console.log("IS CALLED");

      // transform plant list to object with id as key
      const plantsObj = mutation.events.newValue.reduce(toIdKeyedObjectCB, {});
      set(ref(db, REF + "/users/" + store.currentUser.uid + "/plants/"), plantsObj);
    }*/

    const plantsObj = store.plants.reduce(toIdKeyedObjectCB, {});
    set(ref(db, REF + "/users/" + store.currentUser.uid + "/plants/"), plantsObj);
  }

  unsubscribers = [
    ...unsubscribers,
    store.$subscribe(dataChangedInStoreACB)
  ];

  return;
}

export function updateStoreFromFirebase(store) {
  function plantAddedInFirebase(data) {
    store.addPlant(data.val());
  }

  function plantRemovedInFirebase(data) {
    store.removePlant(+data.key);
  }

  unsubscribers = [
    ...unsubscribers,
    onChildAdded(ref(db, REF + "/users/" + store.currentUser.uid + "/plants"), plantAddedInFirebase),
    onChildRemoved(ref(db, REF + "/users/" + store.currentUser.uid + "/plants"), plantRemovedInFirebase)
  ];

  return;
}

export function enableFirebaseSync(store) {
  if (!store.currentUser) {
    // user should always be logged in when calling this,
    // but check just in case.
    console.log("can't enable Firebase sync when logged out");
    return;
  }

  console.log("syncing Firebase ...");

  function initStoreDataByFirebase(data) {
    if (data.exists()) {
      store.plants = Object.values(data.val());
    }
    else {
      // user had no plant data saved
      //console.log("no plant data for user in Firebase");
    }

    console.log("Firebase synced");

    // set up sync after first load
    updateFirebaseFromStore(store);
    updateStoreFromFirebase(store);
  }

  // load data from Firebase, then set up sync
  get(child(ref(db), REF + "/users/" + store.currentUser.uid + "/plants"))
    .then(initStoreDataByFirebase)
    .catch((error) => { console.error(error); });
}

export function disableFirebaseSync() {
  console.log("desyncing Firebase ...");

  unsubscribers.forEach(unsubscribe => unsubscribe());
  unsubscribers = [];

  console.log("Firebase desynced");
}
