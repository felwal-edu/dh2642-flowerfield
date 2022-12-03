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
  </div>
</template>



<script setup>
import { ref } from "vue"

const count = ref(0)

const increaseCount = () => {
  count.value++}
const decreaseCount = () => {
  count.value--}
</script>


