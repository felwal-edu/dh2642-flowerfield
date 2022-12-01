import { getPlantByImage } from "./plantIdService.js"
import { exampleBase64Image, getPlantByImageMock } from "./plantIdServiceMock.js"
import resolvePromise from "./resolvePromise.js"

const promiseState = {}

function notify() {
  console.log("promise state: ")
  console.log(promiseState)
}

console.log("hej")
console.log("temp: " + getPlantByImage + getPlantByImageMock);

resolvePromise(getPlantByImageMock(exampleBase64Image), promiseState, notify);
