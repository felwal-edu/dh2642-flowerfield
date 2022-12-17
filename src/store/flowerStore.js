// the data container for the flower information gathered from the API

import log from "@/utils/logUtils";
import { defineStore } from "pinia";

const useFlowerStore = defineStore({
  id: "user",

  state: () => ({
    currentUser: undefined, // undefined if not loaded, null if not logged in
    plants: null,
    experience: 0,
    userName: "",
    ranks: [["Dirt", 0], ["Seed", 1], ["Sprout", 50], ["Sapling", 100], ["Bush", 250], ["Birch", 500], ["Oak", 1000]]

  }),

  actions: {
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
      // don't add duplicates
      if (this.hasPlant(plant.scientificName)) {
        //log.w("plant already exists");
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
        log.w("trying to remove non-existent plant", plant.scientificName);
        return;
      }

      function hasDifferentIdCB(plant_) {
        return plant_.id !== plant.id;
      }

      function hasSameGenusCB(plant_) {
        return plant_.genus === plant.genus;
      }

      this.experience -= 10 * this.plants.filter(hasSameGenusCB).length;

      this.plants = this.plants.filter(hasDifferentIdCB);

      log.i(plant.id + " has been removed");
    },

    searchPlants(query) {
      function includesQueryCB(plant) {
        return plant.scientificName.toLowerCase().includes(query.toLowerCase());
      }
      log.d("TESSSSWTSTSTSTSADJAJNDANDN", [...this.plants].filter(includesQueryCB))
      return ([...this.plants].filter(includesQueryCB) || undefined);
    }
  }
});

export default useFlowerStore;
