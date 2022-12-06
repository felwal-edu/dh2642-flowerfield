import { sortPlants } from "@/utilities";

function CollectionView(props) {
  return (
    <div>
      <div>
        <h1>Your collection</h1>
      </div>
      <div>{renderCollection(props.plants)}</div>
    </div>
  );
}

function renderCollection(plants) {
  function createRowsCB(plantItem) {
    return <tr>{plantItem[1].map(createCollectionColCB)}</tr>;
  }

  function createCollectionColCB(plant) {
    return <td><img src={plant.url} width="100"></img></td>;
  }

  return (
    <div>
    <table>
      <tbody>{Object.entries(sortPlants(plants)).map(createRowsCB)}</tbody>
    </table>
    </div>
  );
}

export default CollectionView;
