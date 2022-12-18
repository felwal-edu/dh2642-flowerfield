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
    resolvePromise(getArticleByPlantName(this.plant.scientificName), this.plantDescriptionPromiseState);
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
