import { getArticleByPlantName } from "@/network/wikipediaService";
import useFlowerStore from "@/store/flowerStore";
import resolvePromise from "@/utils/resolvePromise";
import DetailView from "@/views/detailView";

const DetailPresenter = {
  props: ["plant", "onClose"],

  data() {
    return {
      plantDescriptionPromiseState: {},
    };
  },

  created() {
    // call API
    function processAPIResultACB() {
      // set description if we find it
      let description = document.getElementById("plantdetails");
      if (description == null) {
        return;
      }

      // TODO: förklara varför vi använder innerHTML
      if (this.plantDescriptionPromiseState.data === null || this.plantDescriptionPromiseState.data === undefined) {
        description.innerHTML = "No description for plant was found."
      }
      else {
        description.innerHTML = this.plantDescriptionPromiseState.data;
      }
    }

    resolvePromise(getArticleByPlantName(this.plant.scientificName), this.plantDescriptionPromiseState, processAPIResultACB.bind(this));
  },

  render() {
    function closePopupACB() {
      this.onClose();
    }

    function deletePlantACB() {
      if (window.confirm("Do you want to remove this plant?")) {
        useFlowerStore().removePlant(this.plant);
        closePopupACB.bind(this)();
      }
    }

    return (
      <DetailView
        onClosePopup={closePopupACB.bind(this)}
        onDelete={deletePlantACB.bind(this)}
        currentPlant={this.plant}
        descriptionState={this.plantDescriptionPromiseState} />
    );
  }
}

export default DetailPresenter;
