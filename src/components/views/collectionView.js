import { sortPlants } from "@/utilities";

function CollectionView(props) {
  return (
    <div>
      <div>
        <h1>This is a collection page!</h1>
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
    return <td> {plant} </td>;
  }

  return (
    <table>
      <tbody>{Object.entries(sortPlants(plants)).forEach(createRowsCB)}</tbody>
    </table>
  );
}

export default CollectionView;
