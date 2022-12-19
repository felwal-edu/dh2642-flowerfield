import { getArticleByPlantName } from "@/network/wikipediaService";
import useFlowerStore from "@/store/flowerStore";
import resolvePromise from "@/utils/resolvePromise";
import DetailView from "@/views/detailView";
import DialogView from "@/views/dialogView";

const DetailPresenter = {
  props: ["plant", "onClose"],

  data() {
    return {
      plantDescriptionPromiseState: {},
      showDeletePlantDialog: false,
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

    function showDeletePlantDialogACB() {
      this.showDeletePlantDialog = true;
    }

    function hideDeletePlantDialogACB() {
      this.showDeletePlantDialog = false;
    }

    function deletePlantACB() {
      useFlowerStore().removePlant(this.plant);
      closePopupACB.bind(this)();
    }

    return (
      <div>
        <DetailView
          onClosePopup={closePopupACB.bind(this)}
          onDelete={showDeletePlantDialogACB.bind(this)}
          currentPlant={this.plant}
          descriptionState={this.plantDescriptionPromiseState} />
        {
          this.showDeletePlantDialog
            ? <DialogView
              title="Delete plant?"
              message="This action can't be undone."
              buttonPrimaryText="Delete"
              onButtonPrimaryClick={deletePlantACB.bind(this)}
              cancel
              onDismiss={hideDeletePlantDialogACB.bind(this)} />
            : undefined
        }
      </div>
    );
  }
}

export default DetailPresenter;
