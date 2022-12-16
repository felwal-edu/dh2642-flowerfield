// the data container for the flower information gathered from the API

import log from "@/utils/logUtils";
import { defineStore } from "pinia";
import { observeAuthState } from "../persistence/firebaseAuth";
import { disableFirebaseSync, enableFirebaseSync } from "../persistence/firebaseModel";

const useFlowerStore = defineStore({
  id: "user",

  state: () => ({
    currentUser: undefined, // undefined if not loaded, null if not logged in
    plants: [],
    experience: 0,
    userName: "",
    ranks: [["Dirt", 0], ["Seed", 1], ["Sprout", 50], ["Sapling", 100], ["Bush", 250], ["Birch", 500], ["Oak", 1000]]

  }),

  actions: {

    initUser() {
      function signedInACB(user) {
        this.currentUser = user;

        enableFirebaseSync(this); // TODO: should we pass store like this?
      }

      function signedOutACB() {
        disableFirebaseSync();

        this.currentUser = null;
        this.plants = [];
      }

      // this observes any changes to "signed in / signed out" state
      observeAuthState(signedInACB.bind(this), signedOutACB.bind(this));
    },

    setUserName(userName) {
      this.userName = userName;
    },

    hasPlant(plantName) {
      function hasSamePlantIdCB(plant) {
        return plant.scientificName === plantName;
      }

      return this.plants.find(hasSamePlantIdCB);

    },

    addPlant(plant) {
      if (this.hasPlant(plant.scientificName)) {
        log.w("plant already exists");
        return;
      }

      function hasSameGenusCB(plant_) {
        return plant_.genus === plant.genus;
      }

      this.plants = [...this.plants, plant];
      this.experience += 10 * this.plants.filter(hasSameGenusCB).length;
    },

    removePlant(plant) {
      if (!this.hasPlant(plant.scientificName)) {
        log.w("plant does not exist");
        return;
      }

      function hasDifferentIdCB(plant_) {
        return plant_.id !== plant.id;
      }

      this.plants = this.plants.filter(hasDifferentIdCB);
      log.i(plant.id + " has been removed");
    },

    searchPlants(query) {
      function includesQueryCB(plant){
        return plant.scientificName.toLowerCase().includes(query.toLowerCase());
      }
      log.d("TESSSSWTSTSTSTSADJAJNDANDN", [...this.plants].filter(includesQueryCB))
      return ([...this.plants].filter(includesQueryCB) || undefined);
    }
  }
});

export default useFlowerStore;
