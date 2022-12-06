import useFlowerStore from "@/data/flowerStore.js";
import { examplePlantArray } from "@/data/network/plantIdServiceMock.js";
import CollectionView from "../views/collectionView.js";

export default
function Collection(props){
    //change examplePlantArray back to useFlowerStore().plants
    return <CollectionView plants={examplePlantArray}/>;
}
