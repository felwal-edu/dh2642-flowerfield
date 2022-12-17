import firebaseConfig from "./firebaseSecrets";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onChildAdded, onChildRemoved, get, child, onValue } from "firebase/database";
import { watch } from "vue";
import log from "@/utils/logUtils";

// init

log.i("initializing Firebase ...")

export const app = initializeApp(firebaseConfig);
const db = getDatabase();

const REF = "flowerModel";

let unsubscribers = [];

//

export function setUserMetadata(user) {
  set(ref(db, REF + "/users/" + user.uid + "/email"), user.email);
}

export function updateFirebaseFromStore(store) {
  function nameChangedInStoreACB(newName) {
    set(ref(db, REF + "/users/" + store.currentUser.uid + "/name"), newName);
  }

  function plantsChangedInStoreACB(newPlants) {
    function toNameKeyedObjectCB(obj, plant) {
      return { ...obj, [plant.scientificName]: plant };
    }


    const plantsObj = newPlants.reduce(toNameKeyedObjectCB, {});

    set(ref(db, REF + "/users/" + store.currentUser.uid + "/plants/"), plantsObj);
  }

  function experienceChangedInStoreACB(storeExp) {
    set(ref(db, REF + "/users/" + store.currentUser.uid + "/experience"), storeExp);
  }

  unsubscribers = [
    ...unsubscribers,
    watch(() => store.plants, plantsChangedInStoreACB),
    watch(() => store.experience, experienceChangedInStoreACB)];
}

export function updateStoreFromFirebase(store) {
  function plantAddedInFirebase(data) {
    store.addPlant(data.val());
  }

  function plantRemovedInFirebase(data) {
    store.removePlant(+data.key);
  }

  function experienceAddedInFirebase(experience) {
    if (store.experience !== experience) {
      store.experience = experience;
    }
  }

  unsubscribers = [
    ...unsubscribers,
    onChildAdded(ref(db, REF + "/users/" + store.currentUser.uid + "/plants"), plantAddedInFirebase),
    onChildRemoved(ref(db, REF + "/users/" + store.currentUser.uid + "/plants"), plantRemovedInFirebase),
    onValue(ref(db, REF + "/users/" + store.currentUser.uid + "/experience"), experienceAddedInFirebase)

  ];
}

export function enableFirebaseSync(store) {
  if (!store.currentUser) {
    // user should always be logged in when calling this,
    // but check just in case.
    log.w("can't enable Firebase sync when logged out");
  }

  log.i("syncing Firebase ...");

  function initStoreDataByFirebase(data) {
    if (data.exists()) {
      store.userName = data.val().name || "";
      store.plants = Object.values(data.val().plants || {});
      store.experience = data.val().experience || 0;

      log.i("account loaded");
    }
    else {
      // user did not already exist; the account was created just now.
      log.i("account created");
      createAccount(store.currentUser);
    }

    log.i("Firebase synced");

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
  log.i("desyncing Firebase ...");

  unsubscribers.forEach(unsubscribe => unsubscribe());
  unsubscribers = [];

  log.i("Firebase desynced");
}
