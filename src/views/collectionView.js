import { sortPlants } from "@/utils/plantUtils";
import { capitalize } from "vue";

function CollectionView(props) {
  function onSortChangeACB(evt) {
    props.onSort(evt);
  }
  return (
    <div>
      <div>
        <v-toolbar
          color="#96c29f"
        >
          <v-toolbar-title>Your Collection</v-toolbar-title>
          <v-spacer></v-spacer>
          <p class="font-weight-bold">
            Sort:
          </p>
          <var-toolbar-items>
            <v-divider vertical></v-divider>
            <v-select
              model-value={props.sort}
              items={["Genus A-Z", "Genus Z-A"]}
              onUpdate:modelValue={onSortChangeACB}
            >
            </v-select>
          </var-toolbar-items>
        </v-toolbar>
      </div>
      <div>{renderCollection(props.plants, props.sort)}</div>
    </div>
  );
}

function renderCollection(plants, order) {
  function createRowsCB(plantItem) {
    return (
      <v-expansion-panels
        focusable
        model-value={[0]}
      >
        <v-expansion-panel title={capitalize(plantItem[0]) + " (" + plantItem[1].length + ")"} >
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
        <v-card max-width="150" class="mx-3" >
          <v-img src={plant.url} max-width="150" max-heigth="200" />
          <v-card-title class="plant-name">
            {capitalize(plant.scientificName.split(" ")[1])}
          </v-card-title>
        </v-card>
      </td>
    );
  }

  if (order === "Genus A-Z") {
    return (
      <div>{Object.entries(sortPlants(plants)).map(createRowsCB)}</div>
    );
  } else {
    return (
      <div>{Object.entries(sortPlants(plants)).reverse().map(createRowsCB)}</div>
    );
  }
}

export default CollectionView;
