// the data container for the flower information gathered from the API

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
      function hasSameGenusCB(plant_) {
        return plant_.genus === plant.genus;
      }

      if (this.hasPlant(plant.scientificName)) {
        console.log("plant already exists");
        return;
      }

      // TODO: this makes the subscriber broken for plants
      //this.experienceadder()

      this.plants = [...this.plants, plant];

      this.experience += 10 * this.plants.filter(hasSameGenusCB).length
      console.log("it's gaming time")
      console.log(10 * this.plants.filter(hasSameGenusCB).length)

      //console.log(plant + " has been added, you gained: " + (10 * Object.keys(this.plants[plant.genus]).length) + "of experience");
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
