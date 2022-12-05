//the data container for the flower information gathered from the API

import { defineStore } from "pinia";
import { observeAuthState } from "./persistence/firebaseAuth";
import { updateUserData } from "./persistence/firebaseModel";



export const UserInfoStore = defineStore(
    {
        id: 'user',
        state: () => ({
            currentUser: undefined, // undefined if not loaded, null if not logged in
            plants: []
        }),
        actions: {
            initUser() {
                function signedInACB(user) {
                    console.log(user);

                    this.currentUser = user;

                    // TODO: only if first time?
                    updateUserData(user);

                    // TODO: load data firebase -> model
                }

                function signedOutACB() {
                    this.currentUser = null;

                    // TODO: empty model? unsubscribe from firebases changes?
                }

                // this observes any changes to "signed in / signed out" state
                observeAuthState(signedInACB.bind(this), signedOutACB.bind(this));
            },

            /*
                        hasPlant(plantId) {
                            function hasSamePlantIdCB(plant) {
                                return plant.id === plantId;
                            }

                            return this.plants.find(hasSamePlantIdCB);
                        },

                        */
            addplant(plant) {

                /*if (this.hasPlant(plant.id)) {
                    console.log("plant already exists");
                    return;
                }*/

                this.plants = [...this.plants, plant]
                console.log(plant + " has been added")
            }


            /* },
             addPlant(plant_id,plant_name,plant_details,scientific_name,plant_genus,plant_species){
                 this.plants.push({id: plant_id ,plantName: plant_name ,plantDetails: plant_details,scientificName: scientific_name,genus: plant_genus,species:plant_species, acquired: false})
             },
             /*acquirePlant(plant_id){


             //if id exists, set the objects acquired to true
             //if id doesn't exist, do nothing.
                 idFinderCB(plant_id){}

                 if this.plants.find(idfinderCB){
                     this.plants["acquired"] = true
                 }
             }*/

        }
    })
