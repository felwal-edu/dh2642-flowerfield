// the data container for the flower information gathered from the API

import { defineStore } from "pinia";
import { observeAuthState } from "../persistence/firebaseAuth";
import { disableFirebaseSync, enableFirebaseSync, setUserMetadata } from "../persistence/firebaseModel";

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

        setUserMetadata(user); // TODO: only if just signed up?
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
    },

    searchPlants(query) {
      function includesQueryCB(plant){
        console.log("REEEEEeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
        console.log(plant.scientificName.toLowerCase().includes(query.toLowerCase()), "TESTTTTTTTTTTTTTT");
        return plant.scientificName.toLowerCase().includes(query.toLowerCase());
      }
      console.log(this.plants, "WHACK SHIT BRO")
      return [...this.plants].filter(includesQueryCB);
    }
  }
});

export default useFlowerStore;
