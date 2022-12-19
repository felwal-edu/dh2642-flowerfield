import useFlowerStore from "@/store/flowerStore.js";
import CollectionView from "../views/collectionView.js";
import EmptyPageView from "@/views/emptyPageView.js";
import ToolbarView from "@/views/toolbarView.js";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils.js";
import log from "@/utils/logUtils.js";
import { mapState } from "pinia";
import LoadingView from "@/views/loadingView.js";
import DetailPresenter from "./detailPresenter.js";

const CollectionPresenter = {
  data() {
    return {
      sortStatus: "Name A-Z",
      searchStatus: false,
      searchQuery: "",
      searchResult: [],
      selectedPlant: null,
      icon: "mdi-magnify",
    };
  },

  computed: {
    ...mapState(useFlowerStore, {userStatus: "currentUser"}),
    ...mapState(useFlowerStore, ["userName"])
  },

  created() {
    // when view is creaated / initiated, force scroll to top
    // otherwise toolbar will be hidden
    window.scrollTo(0, 0);
  },

  render() {
    if (waitingForUserToBeSignedIn(this.userStatus, this.$router) || useFlowerStore().plants === null) {
      return <LoadingView />;
    }

    function sortACB(order) {
      this.sortStatus = order;
    }

    function openDetailsACB(plant) {
      this.selectedPlant = plant;
    }

    function closeDetailsACB() {
      this.selectedPlant = null;
    }

    function setQueryACB(query) {
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

    return (
      <div>
        <ToolbarView
          userName={this.userName}
          sortStatus={this.sortStatus}
          onQueryChange={setQueryACB.bind(this)}
          onSearch={searchACB.bind(this)}
          resetSearch={resetSearchACB.bind(this)}
          onSort={sortACB.bind(this)} />
        {
          useFlowerStore().plants.length === 0
            ? <EmptyPageView message={"You have not added any plants to your collection!"} />
            : (this.searchStatus === true && this.searchResult.length === 0)
              ? <EmptyPageView message={"No results!"} />
              : (
                <div>
                  <CollectionView
                    plants={useFlowerStore().plants}
                    searchStatus={this.searchStatus}
                    searchQuery={this.searchQuery}
                    searchQueryPlants={this.searchResult}
                    userName={this.userName}
                    sort={this.sortStatus}
                    onOpenDetails={openDetailsACB.bind(this)} />
                  {
                    this.selectedPlant
                      ? <DetailPresenter
                        plant={this.selectedPlant}
                        onClose={closeDetailsACB.bind(this)} />
                      : undefined
                  }
                </div>
              )
        }
      </div>
    );
  },
};

export default CollectionPresenter;
