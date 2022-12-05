export default class FlowerModel {
  constructor(plants=[]) {
    this.plants = plants;

    this.observers = [];
  }

  // plant

  addPlant(plant) {
    if (this.hasPlant(plant.id)) {
      console.log("plant already exists");
      return;
    }

    this.plants = [...this.plants, plant];

    const payload = {addPlant: plant}
    this.notifyObservers(payload);
  }

  removePlant(plantId) {
    if (!this.hasPlant(plantId)) {
      console.log("plant does not exist");
      return;
    }

    function hasDifferentIdCB(plant) {
      plant.id !== plantId;
    }

    this.plants = this.plants.filter(hasDifferentIdCB);

    const payload = {removePlantId: plantId}
    this.notifyObservers(payload);
  }

  hasPlant(plantId) {
    function hasSamePlantIdCB(plant) {
        return plant.id === plantId;
    }

    return this.plants.find(hasSamePlantIdCB);
}

  // observer

  addObserver(callback) {
    this.observers = [...this.observers, callback];
  }

  removeObserver(callback) {
    function isDifferentCB(observer) {
      return observer !== callback;
    }

    this.observers = this.observers.filter(isDifferentCB);
  }

  notifyObservers(payload) {
    function invokeObserverCB(observer) {
      try {
        observer(payload);
      }
      catch (error) {
        console.error(error);
      }
    }

    this.observers.forEach(invokeObserverCB);
  }
}
