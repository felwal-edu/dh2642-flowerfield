import useFlowerStore from "@/store/flowerStore.js";
import { examplePlantArray } from "@/network/plantIdExample.js";
import CollectionView from "../views/collectionView.js";
import { watch } from "vue";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils.js";

const CollectionPresenter = {
  data() {
    return {
      userStatus: undefined,
      sortStatus: "Genus A-Z",
      popupStatus: false,
      selected: undefined,
      username: ""
    };
  },

  created() {
    this.userStatus = useFlowerStore().currentUser;

    // watch user status
    watch(() => useFlowerStore().currentUser, function (newUser) {
      this.userStatus = newUser;
    }.bind(this));
  },

  render() {
    if (waitingForUserToBeSignedIn(this.userStatus, this.$router)) return;

    function sortACB(order) {
      this.sortStatus = order;
    }

    function openPopupACB(plant) {
      this.selected = plant;
      this.popupStatus = true;
    }

    function closePopupACB() {
      this.popupStatus = false;
    }
    if (this.userStatus == undefined) {
      return;
    }
    else {
      console.log("plants:")
      console.log(useFlowerStore().plants)
      return (
        <CollectionView
          plants={useFlowerStore().plants /*examplePlantArray*/}
          sort={this.sortStatus}
          overlay={this.popupStatus}
          currentPlant={this.selected}
          onSort={sortACB.bind(this)}
          openPopup={openPopupACB.bind(this)}
          closePopup={closePopupACB.bind(this)}
          username={this.username}
        />
      );
    }
  },
};

export default CollectionPresenter;
