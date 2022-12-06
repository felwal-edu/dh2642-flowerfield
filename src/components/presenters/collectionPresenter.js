import useFlowerStore from "@/data/flowerStore.js";
import CollectionView from "../views/collectionView.js";

export default
function Collection(props){
    return <CollectionView plants={useFlowerStore().plants}/>;
}
