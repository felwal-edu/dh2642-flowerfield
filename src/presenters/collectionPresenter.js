import useFlowerStore from "@/store/flowerStore.js";
import CollectionView from "../views/collectionView.js";
import DetailView from "@/views/detailView.js";
import EmptyPageView from "@/views/emptyPageView.js";
import ToolBarView from "@/views/toolBarView.js";

import { waitingForUserToBeSignedIn } from "@/utils/userUtils.js";
import log from "@/utils/logUtils.js";
import { mapState } from "pinia";
import promiseNoData from "@/views/promiseNodata.js";
import LoadingView from "@/views/loadingView.js";
import { getArticleByPlantName } from "@/network/wikipediaService.js";
import resolvePromise from "@/utils/resolvePromise.js";

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
      plantDescriptionPromiseState: {},
    };
  },

  computed: {
    ...mapState(useFlowerStore, {
      userStatus: "currentUser",
      username: "userName"
    })
  },

  render() {
    if (waitingForUserToBeSignedIn(this.userStatus, this.$router) || useFlowerStore().plants === null) {
      return <LoadingView />;
    }

    function sortACB(order) {
      this.sortStatus = order;
    }

    function openPopupACB(plant) {
      this.selected = plant;
      this.popupStatus = true;

      // call API
      function processAPIResultACB() {
        // set description if we find it
        let description = document.getElementById("plantdetails");
        if (description == null) {
          return;
        }

        if (this.plantDescriptionPromiseState.data == null || this.plantDescriptionPromiseState.data == undefined) {
          description.innerHTML = "No description for plant was found."
        }
        else {
          description.innerHTML = this.plantDescriptionPromiseState.data;
        }
      }

      resolvePromise(getArticleByPlantName(plant.scientificName), this.plantDescriptionPromiseState, processAPIResultACB.bind(this));
    }

    function closePopupACB() {
      this.popupStatus = false;
    }

    function deletePlantACB() {
      if (window.confirm("Do you want to remove this plant?")) {
        useFlowerStore().removePlant(this.selected);
        closePopupACB.bind(this)();
      }
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

    function renderToolbar() {
      return (
        <ToolBarView
          username={this.username}
          sortStatus={this.sortStatus}
          updateQuery={updateQueryACB.bind(this)}
          onSearch={searchACB.bind(this)}
          resetSearch={resetSearchACB.bind(this)}
          onSort={sortACB.bind(this)}
        />
      )
    }

    return (useFlowerStore().plants.length === 0 || (this.searchResult.length === 0 && this.searchStatus === true))
      ? (
        <div>
          <ToolBarView
            username={this.username}
            sortStatus={this.sortStatus}
            updateQuery={updateQueryACB.bind(this)}
            onSearch={searchACB.bind(this)}
            resetSearch={resetSearchACB.bind(this)}
            onSort={sortACB.bind(this)}
          />
          <EmptyPageView
            message={useFlowerStore().plants.length === 0 ? "You have not added any plants to your collection!" : ("No results!")}
          />
        </div>
      )
      : (
        <div>
        <div>
          <ToolBarView
            username={this.username}
            sortStatus={this.sortStatus}
            updateQuery={updateQueryACB.bind(this)}
            onSearch={searchACB.bind(this)}
            resetSearch={resetSearchACB.bind(this)}
            onSort={sortACB.bind(this)}
          />
        </div>
          <CollectionView
            plants={useFlowerStore().plants}
            searchStatus={this.searchStatus}
            searchQuery={this.searchQuery}
            searchQueryPlants={this.searchResult}
            username={this.username}
            sort={this.sortStatus}
            openPopup={openPopupACB.bind(this)}
          />
          <DetailView
            closePopup={closePopupACB.bind(this)}
            onDelete={deletePlantACB.bind(this)}
            currentPlant={this.selected}
            overlay={this.popupStatus}
            descriptionState={this.plantDescriptionPromiseState}
          />
        </div>
      );
  },
};

export default CollectionPresenter;
