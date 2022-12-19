function compareGenusCB(plantA, plantB) {
  return (plantA.genus === plantB.genus
    ? (plantA.scientificName === plantB.scientificName
      ? 0
      : (plantA.scientificName < plantB.scientificName
        ? -1
        : 1))
    : (plantA.genus < plantB.genus
      ? -1
      : 1));
}

function sortPlantsIntoObject(plants) {
  // 1. take plants and for each plant do a callback
  // 2. The callback should append the plant to a new list in the callback.
  //   a. If the plant has a genus which isnt part of the new list, create a sub-list and put the plant into that.
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

function getRank(ranks, experience) {
  let currentRank = ranks[0];

  for (let i = 0; i < ranks.length; i++) {
    if (experience >= ranks[i][1]) {
      currentRank = ranks[i];
    }
  }

  return currentRank[0];
}

function getProgressBarValue(ranks, experience) {
  function getNextRank(ranks, experience) {
    // get largest rank as default next
    let nextRank = ranks[ranks.length - 1];

    for (let i = 0; i < ranks.length; i++) {
      if (experience < ranks[i][1]) {
        nextRank = ranks[i];

        return nextRank;
      }
    }
    return nextRank;
  }

  const nextRank = getNextRank(ranks, experience)[1];
  if (nextRank === 0) return 0;

  const ratio = Math.round((experience / nextRank) * 100);
  return ratio;
}

export { sortPlantsIntoObject, getRank, getProgressBarValue };
