import { getPlantByImage } from "./plantIdService.js"
import { exampleBase64Image, exampleResponse } from "./plantIdServiceMock.js"
import resolvePromise, { resolvePromiseMock } from "./resolvePromise.js"

const promiseState = {}

function notifyACB() {
  console.log("promise state:")
  console.log(promiseState)
}

console.log("hej")
console.log("temp: " + getPlantByImage + exampleBase64Image + exampleResponse + resolvePromise);

// mock api calls to not waste quota
//resolvePromise(getPlantByImage(exampleBase64Image), promiseState, notifyACB);
resolvePromiseMock(exampleResponse, promiseState, notifyACB);
