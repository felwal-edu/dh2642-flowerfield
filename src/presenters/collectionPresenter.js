import useFlowerStore from "@/store/flowerStore.js";
import { examplePlantArray } from "@/network/plantIdExample.js";
import CollectionView from "../views/collectionView.js";
import DetailView from "@/views/detailView.js";
import EmptyPageView from "@/views/emptyPageView.js";
import SortView from "@/views/sortView.js";
import SearchView from "@/views/searchView.js";
import { watch } from "vue";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils.js";
import log from "@/utils/logUtils.js";
import { mapState } from "pinia";
import promiseNoData from "@/views/promiseNodata.js";
import LoadingView from "@/views/loadingView.js";

const CollectionPresenter = {
  data() {
    return {
      plants: useFlowerStore().plants,
      sortStatus: "Genus A-Z",
      popupStatus: false,
      selected: undefined,
      searchStatus: false,
      searchQuery: "",
      searchResult: [],
      username: "",
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

    function renderToolbar(){
      return (
        <v-toolbar color="#96c29f">
          <v-toolbar-title>
            <h2 class="header-font-collection">{this.username == "" ? "Your Collection" : this.username + "'s Collection"}</h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <SearchView
            updateQuery={updateQueryACB.bind(this)}
            onSearch={searchACB.bind(this)}
            resetSearch={resetSearchACB.bind(this)}
          />
          <v-toolbar-items>
            <SortView
              sort={this.sortStatus}
              onSort={sortACB.bind(this)}
            />
          </v-toolbar-items>
        </v-toolbar>
      );
    }

    log.d(this.sortStatus);

    return (this.plants.length === 0 || (this.searchResult.length === 0 && this.searchStatus === true))
      ? (
        <div>
          {renderToolbar.bind(this)()}
          <div>
            <EmptyPageView
              message={this.plants.length === 0 ? "You have not added any plants to your collection!" : ("No results!")}
            />
          </div>
        </div>
      )
      : (
        <div>
          {renderToolbar.bind(this)()}
          <div>
            <CollectionView
              plants={this.plants}
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
            />
          </div>
        </div>
      );
  },
};

export default CollectionPresenter;
