import useFlowerStore from "@/store/flowerStore.js";
import { examplePlantArray } from "@/network/plantIdExample.js";
import CollectionView from "../views/collectionView.js";
import PopupView from "../views/popupView.js";
import "../css/collection.css";

const CollectionPresenter = {
  data() {
    return {
      userStatus: undefined,
      test: false,
      sortStatus: "Genus A-Z",
      popupStatus: false,
      selected: undefined,
    };
  },

  created() {
    this.userStatus = useFlowerStore().currentUser;

    // TODO: extract used-more-than-once funcitonality
    useFlowerStore().$subscribe(function (mutation, state) {
      // TODO: mutation is not defined in production
      if (mutation.events.key === "currentUser") {
        // transform plant list to object with id as key
        this.userStatus = mutation.events.newValue;
      }
    }.bind(this));
  },

  render() {
    this.test = true;

    function sortACB(order){
      this.sortStatus = order;
    }

    function openPopupACB(plant){
      this.selected = plant;
      this.popupStatus = true;
    }

    function closePopupACB(){
      this.popupStatus = false;
    }

    if (this.userStatus == undefined) {
      return;
    }
    else if (!this.popupStatus){
      return (
        <CollectionView
          plants={/*useFlowerStore().plants*/ examplePlantArray}
          test={this.test}
          sort={this.sortStatus}
          onSort={sortACB.bind(this)}
          openPopup={openPopupACB.bind(this)}
          />
      );
    }
    else{
      return (
        <div>
          <CollectionView
            plants={/*useFlowerStore().plants*/ examplePlantArray}
            test={this.test}
            sort={this.sortStatus}
            onSort={sortACB.bind(this)}
          />
          <PopupView class="overlay_test"
            closePopup={closePopupACB.bind(this)}
            currentPlant={this.selected}
          />
        </div>
      );
    }
  },
};

export default CollectionPresenter;
