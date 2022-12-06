import useFlowerStore from "@/data/flowerStore.js";
import { examplePlantArray } from "@/data/network/plantIdServiceMock.js";
import CollectionView from "../views/collectionView.js";

const CollectionPresnter = {

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
            return <CollectionView plants={useFlowerStore().plants}/>;
        }
    },
}

export default CollectionPresnter;
