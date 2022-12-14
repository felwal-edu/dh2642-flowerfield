import useFlowerStore from "@/store/flowerStore.js";
import { examplePlantArray } from "@/network/plantIdExample.js";
import CollectionView from "../views/collectionView.js";
import "../css/collection.css";
import { watch } from "vue";

const CollectionPresenter = {
  data() {
    return {
      userStatus: undefined,
      sortStatus: "Genus A-Z"
    };
  },

  created() {
    this.userStatus = useFlowerStore().currentUser;

    // watch current user
    watch(() => useFlowerStore().currentUser, function (newUser) {
      this.userStatus = newUser;
    }.bind(this));
  },

  render() {
    function sortACB(order){
      this.sortStatus = order;
    }

    if (this.userStatus == undefined) {
      return;
    }
    else {
      return (
        <CollectionView
          plants={useFlowerStore().plants /*examplePlantArray*/}
          sort={this.sortStatus}
          onSort={sortACB.bind(this)} />
      );
    }
  },
};

export default CollectionPresenter;
