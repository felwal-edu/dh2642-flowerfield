function compareGenusCB(plantA, plantB) {
  return plantA.sub === plantB.sub
    ? plantA.name === plantB.name
      ? 0
      : plantA.name < plantB.name
      ? -1
      : 1
    : plantA.sub < plantB.sub
    ? -1
    : 1;
}

function sortGenusCB(acc, plant) {
  //check if plants genus exists as a property in acc.@

  if (acc[plant.genus]) {
    acc[plant.genus] = [...acc[plant.genus], plant];
  } else {
    //create a new property
    acc[plant.genus] = plant;
  }
}

function sortPlants(plants) {
  //1. take plants and for each plant do a callback
  //2. The callback should append the plant to a new list in the callback.
  //  a.If the plant has a genus which isnt part of the new list, create a sub-list and put the plant into that.
  //  b. If there already exists a sub-list with that genus put the plant into that.

  // Have an object filled with properties for each type of genus.
  return [...plants].sort(compareGenusCB).reduce(sortGenusCB, {});
}

export { sortPlants };
