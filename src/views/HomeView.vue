<template>
  <div class="home">
    <div class="count">
      {{storeCounter.count}}
    </div>
    <div class="buttons">
      <button @click ="storeCounter.decreasecount">-</button>
      <button @click ="storeCounter.increasecount">+</button>
      <button @click ="storeCounter.addPlant(381333016,"Rubus_idaeus", "Rubus idaeus","rubus","idaeus")">epic</button>
    </div>
    <h1>yoyoyo</h1>
    <div>
      This counter is: {{oddOrEven}}
    </div>

  </div>
</template>



<script setup>






import { computed } from "vue"
import {userCounterStore} from "../stores/flowerStore.js"

const storeCounter = userCounterStore()
console.log(storeCounter.count)

//storeCounter.addPlant(381333016, "Rubus idaeus", "Rubus idaeus","rubus","idaeus")
console.log(storeCounter.plants)


const oddOrEven = computed(() => {
  if (storeCounter.count % 2 === 0) return "even"
  return "odd"
})

</script>


