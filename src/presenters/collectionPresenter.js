import useFlowerStore from "@/store/flowerStore.js";
import { examplePlantArray } from "@/network/plantIdExample.js";
import CollectionView from "../views/collectionView.js";
import DetailView from "@/views/detailView.js";
import ErrorView from "@/views/errorView.js";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils.js";
import log from "@/utils/logUtils.js";
import { mapState } from "pinia";

const CollectionPresenter = {
  data() {
    return {
      sortStatus: "Genus A-Z",
      popupStatus: false,
      selected: undefined,
      searchStatus: false,
      searchQuery: "",
      searchResult: [],
      icon: "mdi-magnify",
    };
  },

  computed: {
    ...mapState(useFlowerStore, {
      userStatus: "currentUser",
      username: "userName"
    })
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

    function deletePlantACB() {
      useFlowerStore().removePlant(this.selected);
      closePopupACB.bind(this)();
    }

    function updateQueryACB(query) {
      this.searchQuery = query;
      if (this.searchQuery === "") {
        this.searchStatus = false;
      }
    }

    function searchACB() {
      log.d(this.searchQuery);

      if (this.searchQuery !== "") {
        this.searchStatus = true;
        this.searchResult = useFlowerStore().searchPlants(this.searchQuery);
      }
      else {
        this.searchStatus = false;
      }
    }

    function resetSearchACB() {
      this.searchStatus = false;
    }

    if (this.searchResult.length === 0 && this.searchStatus === true) {
      return (
        <ErrorView
          goToHomePage={resetSearchACB.bind(this)}
        />
      );
    } else {
      return (
        <div>
          <CollectionView
            plants={useFlowerStore().plants}
            sort={this.sortStatus}
            searchStatus={this.searchStatus}
            searchQuery={this.searchQuery}
            searchQueryPlants={this.searchResult}
            icon={this.icon}
            username={this.username}
            onSort={sortACB.bind(this)}
            openPopup={openPopupACB.bind(this)}
            updateQuery={updateQueryACB.bind(this)}
            onSearch={searchACB.bind(this)}
            resetSearch={resetSearchACB.bind(this)}
          />
          <DetailView
            closePopup={closePopupACB.bind(this)}
            onDelete={deletePlantACB.bind(this)}
            currentPlant={this.selected}
            overlay={this.popupStatus}
          />
        </div>
      );
    }
  },
};

export default CollectionPresenter;
