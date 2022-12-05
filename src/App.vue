<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
  </div>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

import "./data/network/plantIdServiceTest"
import { examplePlant } from "./data/network/plantIdServiceMock"
import "./data/persistence/firebaseModel"
import { updateFirebaseFromModel, updateModelFromFirebase } from "./data/persistence/firebaseModel"
import FlowerModel from "./data/FlowerModel"

const model = new FlowerModel()
updateFirebaseFromModel(model, 0)
updateModelFromFirebase(model, 0)
//model.addPlant(examplePlant)
console.log(model)

export default {
  name: "App",
  components: {
    HelloWorld
  }
}

</script>
