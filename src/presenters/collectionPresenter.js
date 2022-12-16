import useFlowerStore from "@/store/flowerStore.js";
import { examplePlantArray } from "@/network/plantIdExample.js";
import CollectionView from "../views/collectionView.js";
import DetailView from "@/views/detailView.js";
import { watch } from "vue";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils.js";
import resolvePromise from "@/utils/resolvePromise.js";
import promiseNoData from "@/views/promiseNodata.js";

const CollectionPresenter = {
  data() {
    return {
      userStatus: undefined,
      sortStatus: "Genus A-Z",
      popupStatus: false,
      selected: undefined,
      searchStatus: false,
      searchQuery: "",
      searchResult: [],
      icon: "mdi-magnify",
      username: "",
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

    function updateQueryACB(query){
      this.searchQuery = query;
    }

    function searchACB(){
      console.log(this.searchQuery);
      if (this.searchQuery !== "" && this.searchStatus === false){
        this.searchStatus = true;
        this.icon = "mdi-close-circle";
        this.searchResult = useFlowerStore().searchPlants(this.searchQuery);
      }
      else{
        this.searchStatus = false;
        this.icon = "mdi-magnify"
        //reset model-value !??!?!?!?
      }
    }

    console.log(this.searchResultsPromiseState,"THIS IS A TEST");

    if (this.userStatus == undefined) {
      return;
    }
    else {
      return (
        <div>
          <CollectionView
            plants={useFlowerStore().plants /*examplePlantArray*/}
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
