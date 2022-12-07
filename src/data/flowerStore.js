// the data container for the flower information gathered from the API

import { defineStore } from "pinia";
import { observeAuthState } from "./persistence/firebaseAuth";
import { disableFirebaseSync, enableFirebaseSync, createUser } from "./persistence/firebaseModel";

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

      this.plants = [...this.plants, plant];
      console.log(plant + " has been added");
      //this.experienceadder()
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

    /*
    addPlant(plant_id, plant_name, plant_details, scientific_name, plant_genus, plant_species) {
      this.plants.push({
        id: plant_id,
        plantName: plant_name,
        plantDetails: plant_details,
        scientificName: scientific_name,
        genus: plant_genus,
        species:plant_species,
        acquired: false
      });
    },

    acquirePlant(plant_id) {
      //if id exists, set the objects acquired to true
      //if id doesn't exist, do nothing.
      idFinderCB(plant_id) {}

      if this.plants.find(idfinderCB) {
        this.plants["acquired"] = true;
      }
    }*/
  }
})

export default useFlowerStore;
