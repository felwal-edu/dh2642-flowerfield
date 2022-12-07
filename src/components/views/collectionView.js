import { sortPlants } from "@/utilities";
import { capitalize } from "vue";

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
    console.log(plantItem);
    return (
      <v-expansion-panels focusable>
        <v-expansion-panel title={capitalize(plantItem[0]) + " (" + plantItem[1].length + ")"}>
          <v-expansion-panel-text>
            <tr>{plantItem[1].map(createCollectionColCB)}</tr>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    );
  }

  function createCollectionColCB(plant) {
    return (
      <td>
        <v-card
        max-width = "150">
          <v-img src={plant.url} width="150" />
          <v-card-title class="plant-name">{capitalize(plant.scientificName.split(" ")[1])}</v-card-title>
        </v-card>
      </td>
    );
  }

  return (
    <div>{Object.entries(sortPlants(plants)).map(createRowsCB)}</div>
  );
}

export default CollectionView;
