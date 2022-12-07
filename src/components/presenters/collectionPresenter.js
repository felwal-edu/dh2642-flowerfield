import useFlowerStore from "@/data/flowerStore.js";
import { examplePlantArray } from "@/data/network/plantIdServiceMock.js";
import CollectionView from "../views/collectionView.js";
import "../../css/collection.css";

const CollectionPresenter = {
  data() {
    return {
      userStatus: undefined,
      test: false,
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
    this.test = true;
    //console.log(useFlowerStore().plants);
    if(this.userStatus == undefined) {
      return;
    }
    else {
      return (
        <CollectionView
          plants={useFlowerStore().plants} test={this.test} />
      );
    }
  },
}

export default CollectionPresenter;
