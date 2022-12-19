import { getDatabase, ref, set, onChildAdded, onChildRemoved, get, child, onValue } from "firebase/database";
import { watch } from "vue";
import log from "@/utils/logUtils";
import useFlowerStore from "@/store/flowerStore";
import { observeAuthState } from "./firebaseAuth";

// init

const db = getDatabase();
const REF = "flowerModel";
let unsubscribers = [];

// set

export function createUserData(user, userName) {
  set(ref(db, REF + "/users/" + user.uid + "/email"), user.email);
  set(ref(db, REF + "/users/" + user.uid + "/name"), userName);
  set(ref(db, REF + "/users/" + user.uid + "/plants"), []);
  set(ref(db, REF + "/users/" + user.uid + "/experience"), 0);

}

export function deleteUserData(user) {
  log.i("Removing user data:", user.email);

  set(ref(db, REF + "/users/" + user.uid), null);
}

// start/stop

export function setUpFirebase() {
  function signedInACB(user) {
    useFlowerStore().currentUser = user;

    function dataLoadedACB() {
      enableFirebaseSync();
    }

    // load existing data, then start sync
    loadFirebaseData(dataLoadedACB);
  }

  function signedOutACB() {
    disableFirebaseSync();

    useFlowerStore().currentUser = null;
    useFlowerStore().plants = null;
  }

  // this observes any changes to "signed in / signed out" state
  observeAuthState(signedInACB, signedOutACB);
}

function loadFirebaseData(loadedACB) {
  if (!useFlowerStore().currentUser) {
    // user should always be logged in when calling this,
    // but check just in case.
    log.w("can't load Firebase data when logged out");
  }

  log.i("loading Firebase ...");

  function dataLoadedFromFirebaseACB(data) {
    if (data.exists()) {
      // load existing user data
      useFlowerStore().userName = data.val().name || "";
      useFlowerStore().plants = Object.values(data.val().plants || {});
      useFlowerStore().experience = data.val().experience || 0;
    }
    else {
      // no existing user data.

      // important to set to emtpy array, since null (default)
      // is interpreted as "loading"
      useFlowerStore().plants = [];
    }

    log.i("Firebase account data loaded");

    loadedACB();
  }

  // load data from Firebase, then set up sync
  get(child(ref(db), REF + "/users/" + useFlowerStore().currentUser.uid))
    .then(dataLoadedFromFirebaseACB)
    .catch((error) => { log.e(error); });
}

function enableFirebaseSync() {
  // set up sync after first load
  updateFirebaseFromStore(useFlowerStore());
  updateStoreFromFirebase(useFlowerStore());

  log.i("Firebase synced");
}

function disableFirebaseSync() {
  unsubscribers.forEach(unsubscribe => unsubscribe());
  unsubscribers = [];

  log.i("Firebase desynced");
}

// sync

function updateFirebaseFromStore(store) {
  function nameChangedInStoreACB(newName) {
    set(ref(db, REF + "/users/" + store.currentUser.uid + "/name"), newName);
  }

  function plantsChangedInStoreACB(newPlants) {
    function toNameKeyedObjectCB(obj, plant) {
      return {...obj, [plant.scientificName]: plant};
    }

    const plantsObj = newPlants.reduce(toNameKeyedObjectCB, {});
    set(ref(db, REF + "/users/" + store.currentUser.uid + "/plants/"), plantsObj);
  }

  function experienceChangedInStoreACB(storeExp) {
    set(ref(db, REF + "/users/" + store.currentUser.uid + "/experience"), storeExp);
  }

  unsubscribers = [
    ...unsubscribers,
    watch(() => store.userName, nameChangedInStoreACB),
    watch(() => store.plants, plantsChangedInStoreACB),
    watch(() => store.experience, experienceChangedInStoreACB)];
}

function updateStoreFromFirebase(store) {
  function nameChangedInFirebaseACB(data) {
    store.userName = data.val();
  }

  function plantAddedInFirebaseACB(data) {
    store.addPlant(data.val());
  }

  function plantRemovedInFirebaseACB(data) {
    store.removePlant(+data.key);
  }

  function experienceChangedInFirebaseACB(data) {
    if (store.experience !== data.val()) {
      store.experience = data.val();
    }
  }

  unsubscribers = [
    ...unsubscribers,
    onValue(ref(db, REF + "/users/" + store.currentUser.uid + "/name"), nameChangedInFirebaseACB),
    onChildAdded(ref(db, REF + "/users/" + store.currentUser.uid + "/plants"), plantAddedInFirebaseACB),
    onChildRemoved(ref(db, REF + "/users/" + store.currentUser.uid + "/plants"), plantRemovedInFirebaseACB),
    onValue(ref(db, REF + "/users/" + store.currentUser.uid + "/experience"), experienceChangedInFirebaseACB)
  ];
}
