<template>
  <div class="home">
    <div class="count">
      {{ count }}
    </div>
    <div class="buttons">
      <button @click ="decreaseCount">-</button>
      <button @click ="increaseCount">+</button>
    </div>
    <h1>yoyoyo</h1>
    <div>
      This counter is: {{oddOrEven}}
    </div>

  </div>
</template>



<script setup>
import { ref, computed } from "vue"
//import {userCounterStore} from "../stores/flowerStore"

//const storeCounter = userCounterStore()

const count = ref(0)

const increaseCount = () => {
  count.value++}
const decreaseCount = () => {
  count.value--}

const oddOrEven = computed(() => {
  if (count.value % 2 === 0) return "even"
  return "odd"
})
</script>


