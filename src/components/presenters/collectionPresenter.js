import useFlowerStore from "@/data/flowerStore.js";
import { examplePlantArray } from "@/data/network/plantIdServiceMock.js";
import CollectionView from "../views/collectionView.js";
import "../../css/collection.css";

const CollectionPresenter = {
  data() {
    return {
      userStatus: undefined,
    };
  },

  created() {
    this.userStatus = useFlowerStore().currentUser;
    useFlowerStore().$subscribe(function (mutation, state) {
      if (mutation.events.key === "currentUser") {
        // transform plant list to object with id as key
        this.userStatus = mutation.events.newValue;
      }
    }.bind(this));
  },

  render() {
    //console.log(useFlowerStore().plants);
    if(this.userStatus == undefined) {
      return;
    }
    else {
      return (
        <CollectionView
          plants={examplePlantArray /*useFlowerStore().plants*/} />
      );
    }
  },
}

export default CollectionPresenter;
