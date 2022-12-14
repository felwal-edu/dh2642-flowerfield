import firebaseConfig from "./firebaseSecrets";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onChildAdded, onChildRemoved, get, child } from "firebase/database";
import { watch } from "vue";

// init

console.log("initializing firebase ...")

export const app = initializeApp(firebaseConfig);
const db = getDatabase();

const REF = "flowerModel";

let unsubscribers = [];

//

export function setUserMetadata(user) {
  set(ref(db, REF + "/users/" + user.uid + "/email"), user.email);
}

export function updateFirebaseFromStore(store) {
  function plantsChangedInStoreACB(newPlants) {
    function toNameKeyedObjectCB(obj, plant) {
      return {...obj, [plant.scientificName]: plant};
    }

    const plantsObj = newPlants.reduce(toNameKeyedObjectCB, {});
    set(ref(db, REF + "/users/" + store.currentUser.uid + "/plants/"), plantsObj);
  }

  unsubscribers = [
    ...unsubscribers,
    watch(() => store.plants, plantsChangedInStoreACB)
  ];
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
}

export function enableFirebaseSync(store) {
  if (!store.currentUser) {
    // user should always be logged in when calling this,
    // but check just in case.
    console.log("can't enable Firebase sync when logged out");
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
