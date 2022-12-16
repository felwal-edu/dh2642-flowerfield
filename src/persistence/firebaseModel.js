import firebaseConfig from "./firebaseSecrets";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onChildAdded, onChildRemoved, get, child, onValue } from "firebase/database";
import { watch } from "vue";

// init

console.log("initializing Firebase ...")

export const app = initializeApp(firebaseConfig);
const db = getDatabase();

const REF = "flowerModel";

let unsubscribers = [];

//

function createAccount(user) {
  set(ref(db, REF + "/users/" + user.uid + "/email"), user.email);
  set(ref(db, REF + "/users/" + user.uid + "/name"), "");
  set(ref(db, REF + "/users/" + user.uid + "/plants"), []);
  set(ref(db, REF + "/users/" + user.uid + "/experience"), 0);
}

//

export function updateFirebaseFromStore(store) {
  function nameChangedInStoreACB(newName) {
    console.log("setting new name: " + newName);

    set(ref(db, REF + "/users/" + store.currentUser.uid + "/name"), newName);
  }

  function plantsChangedInStoreACB(newPlants) {
    console.log("store plants:")
    console.log(newPlants)

    function toNameKeyedObjectCB(obj, plant) {
      return { ...obj, [plant.scientificName]: plant };
    }

    const plantsObj = newPlants.reduce(toNameKeyedObjectCB, {});
    set(ref(db, REF + "/users/" + store.currentUser.uid + "/plants/"), plantsObj);
  }

  function experienceChangedInStoreACB(storeExp) {
    console.log("store exp:")
    console.log(storeExp)

    set(ref(db, REF + "/users/" + store.currentUser.uid + "/experience"), store.experience);
  }

  unsubscribers = [
    ...unsubscribers,
    watch(() => store.userName, nameChangedInStoreACB),
    watch(() => store.plants, plantsChangedInStoreACB),
    watch(() => store.experience, experienceChangedInStoreACB)];
}

export function updateStoreFromFirebase(store) {
  function nameChangedInFirebase(data) {
    store.userName = data.val();
  }

  function plantAddedInFirebase(data) {
    store.addPlant(data.val());
  }

  function plantRemovedInFirebase(data) {
    store.removePlant(+data.key);
  }

  function experienceAddedInFirebase(data) {
    if (store.experience !== data.val()) {
      store.experience = data.val();
    }
  }

  unsubscribers = [
    ...unsubscribers,
    onValue(ref(db, REF + "/users/" + store.currentUser.uid + "/name"), nameChangedInFirebase),
    onChildAdded(ref(db, REF + "/users/" + store.currentUser.uid + "/plants"), plantAddedInFirebase),
    onChildRemoved(ref(db, REF + "/users/" + store.currentUser.uid + "/plants"), plantRemovedInFirebase),
    onValue(ref(db, REF + "/users/" + store.currentUser.uid + "/experience"), experienceAddedInFirebase)
  ];
}

//

export function enableFirebaseSync(store) {
  if (!store.currentUser) {
    // user should always be logged in when calling this,
    // but check just in case.
    console.log("can't enable Firebase sync when logged out");
  }

  console.log("syncing Firebase ...");

  function initStoreDataByFirebase(data) {
    if (data.exists()) {
      store.userName = data.val().name || "";
      store.plants = Object.values(data.val().plants || {});
      store.experience = data.val().experience || 0;

      console.log("account loaded");
    }
    else {
      // user did not already exist; the account was created just now.
      console.log("account created");
      createAccount(store.currentUser);
    }

    console.log("Firebase synced");

    // set up sync after first load
    updateFirebaseFromStore(store);
    updateStoreFromFirebase(store);
  }

  // load data from Firebase, then set up sync
  get(child(ref(db), REF + "/users/" + store.currentUser.uid))
    .then(initStoreDataByFirebase)
    .catch((error) => { console.error(error); });
}

export function disableFirebaseSync() {
  console.log("desyncing Firebase ...");

  unsubscribers.forEach(unsubscribe => unsubscribe());
  unsubscribers = [];

  console.log("Firebase desynced");
}
