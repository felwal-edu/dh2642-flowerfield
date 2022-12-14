import useFlowerStore from "@/store/flowerStore.js";
import { examplePlantArray } from "@/network/plantIdExample.js";
import CollectionView from "../views/collectionView.js";
import "../css/collection.css";
import { watch } from "vue";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils.js";

const CollectionPresenter = {
  data() {
    return {
      userStatus: undefined,
      sortStatus: "Genus A-Z"
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

    function sortACB(order){
      this.sortStatus = order;
    }

    return (
      <CollectionView
        plants={useFlowerStore().plants /*examplePlantArray*/}
        sort={this.sortStatus}
        onSort={sortACB.bind(this)} />
    );
  },
};

export default CollectionPresenter;
