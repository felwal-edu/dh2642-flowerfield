<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue"

import "./data/network/plantIdServiceTest"
import { examplePlant } from "./data/network/plantIdServiceMock"
import "./data/persistence/firebaseModel"
import FlowerModel from "./data/FlowerModel"

const model = new FlowerModel()
model.addPlant(examplePlant)
console.log(model)

export default {
  name: "App",
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
