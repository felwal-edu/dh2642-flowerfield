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
    this.username = useFlowerStore().userName;

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
        <div>
          <CollectionView
            plants={useFlowerStore().plants /*examplePlantArray*/}
            sort={this.sortStatus}
            searchStatus={this.searchStatus}
            searchQuery={this.searchQuery}
            searchQueryPlants={this.searchResultsPromiseState}
            icon={this.icon}
            username={this.username}
            onSort={sortACB.bind(this)}
            openPopup={openPopupACB.bind(this)}
          />
          <DetailView
            closePopup={closePopupACB.bind(this)}
            currentPlant={this.selected}
            overlay={this.popupStatus}
          />
        </div>
      );
    }
  },
};

export default CollectionPresenter;
