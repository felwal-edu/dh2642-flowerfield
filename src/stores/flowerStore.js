//the data container for the flower information gathered from the API

import { defineStore} from "pinia";


export const userCounterStore = defineStore(
    {
    id: 'counter',
    state: () => ({
        count: 0,
        name: "ooga",
        plants:[]
    }),
    actions:{
        increasecount(){
            this.count++
        },
        decreasecount(){
            this.count--
        },
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