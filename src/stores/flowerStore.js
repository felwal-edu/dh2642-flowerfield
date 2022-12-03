//the data container for the flower information gathered from the API

import { defineStore} from "pinia";
/*
export const useFlowerStore = defineStore( id: "FlowerStore", options: {
    state:{} =>{}
        return {
            products,
        }
    }
})
*/

export const userCounterStore = defineStore({
    id: "counter",
    state: () =>({
        count: 0
    })
})