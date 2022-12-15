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

function sortPlantsIntoObject(plants) {
  // 1. take plants and for each plant do a callback
  // 2. The callback should append the plant to a new list in the callback.
  //   a.If the plant has a genus which isnt part of the new list, create a sub-list and put the plant into that.
  //   b. If there already exists a sub-list with that genus put the plant into that.

  function getGenusKeyedObject(plants) {
    const plantsByGenus = {};

    function addPlantToObjectCB(plant) {
      // check if plants genus exists as a property in genusObject
      if (plantsByGenus[plant.genus]) {
        plantsByGenus[plant.genus] = [...plantsByGenus[plant.genus], plant];
      }
      else {
        // create a new property
        plantsByGenus[plant.genus] = [plant];
      }
    }

    plants.forEach(addPlantToObjectCB);

    return plantsByGenus;
  }

  // Have an object filled with properties for each type of genus.
  return getGenusKeyedObject([...plants].sort(compareGenusCB));
}

function rankDisplay(experience) {
  const ranks = [["seed", 0], ["sprout", 50], ["sapling", 100], ["youngTree", 250], ["matureTree", 500]]
  let currentRank = "seed";

  for (let i = 0; i < ranks.length; i++) {
    if (experience >= ranks[i][1]) {
      currentRank = ranks[i][0];
    }

    return currentRank;
  }
}

export { sortPlantsIntoObject, rankDisplay };
