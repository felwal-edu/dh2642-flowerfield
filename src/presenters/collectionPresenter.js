import useFlowerStore from "@/store/flowerStore.js";
import { examplePlantArray } from "@/network/plantIdExample.js";
import CollectionView from "../views/collectionView.js";
import "../css/collection.css";

const CollectionPresenter = {
  data() {
    return {
      userStatus: undefined,
      test: false,
      sortStatus: "Genus A-Z"
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

    if (this.userStatus == undefined) {
      return;
    }
    else {
      return (
        <CollectionView
          plants={/*useFlowerStore().plants*/ examplePlantArray}
          test={this.test}
          sort={this.sortStatus}
          onSort={sortACB.bind(this)} />
      );
    }
  },
};

export default CollectionPresenter;
