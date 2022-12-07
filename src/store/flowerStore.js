// the data container for the flower information gathered from the API

import { defineStore } from "pinia";
import { observeAuthState } from "../persistence/firebaseAuth";
import { disableFirebaseSync, enableFirebaseSync, createUser } from "../persistence/firebaseModel";

const useFlowerStore = defineStore({
  id: "user",

  state: () => ({
    currentUser: undefined, // undefined if not loaded, null if not logged in
    plants: [],
    experience: 0
  }),

  actions: {

    experienceadder() {
      this.experience += 10;
    },

    initUser() {
      function signedInACB(user) {
        this.currentUser = user;

        createUser(user); // TODO: only if just signed up?
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

    hasPlant(plantName) {
      function hasSamePlantIdCB(plant) {
        return plant.scientificName === plantName;
      }

      return this.plants.find(hasSamePlantIdCB);

    },

    addPlant(plant) {
      if (this.hasPlant(plant.scientificName)) {
        console.log("plant already exists");
        return;
      }

      // TODO: this makes the subscriber broken for plants
      //this.experienceadder()

      this.plants = [...this.plants, plant];
      console.log(plant + " has been added");
    },

    removePlant(plantId) {
      if (!this.hasPlant(plantId)) {
        console.log("plant does not exist");
        return;
      }

      function hasDifferentIdCB(plant) {
        plant.id !== plantId;
      }

      this.plants = this.plants.filter(hasDifferentIdCB);
      console.log(plantId + " has been removed");
    }
  }
});

export default useFlowerStore;
