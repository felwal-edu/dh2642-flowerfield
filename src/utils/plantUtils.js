function compareGenusCB(plantA, plantB) {
  return plantA.genus === plantB.genus
    ? plantA.scientificName === plantB.scientificName
      ? 0
      : plantA.scientificName < plantB.scientificName
        ? -1
        : 1
    : plantA.genus < plantB.genus
      ? -1
      : 1;
}

function sortPlants(plants) {
  // 1. take plants and for each plant do a callback
  // 2. The callback should append the plant to a new list in the callback.
  //   a.If the plant has a genus which isnt part of the new list, create a sub-list and put the plant into that.
  //   b. If there already exists a sub-list with that genus put the plant into that.
  const genusObject = {};

  function sortGenusCB(plant) {
    // check if plants genus exists as a property in genusObject
    if (genusObject[plant.genus]) {
      genusObject[plant.genus] = [...genusObject[plant.genus], plant];
    } else {
      //create a new property
      genusObject[plant.genus] = [plant];
    }
  }

  // Have an object filled with properties for each type of genus.

  const test = [...plants].sort(compareGenusCB);
  test.forEach(sortGenusCB);
  return genusObject;
}

export { sortPlants };
