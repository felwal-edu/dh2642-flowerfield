import { sortPlants } from "@/utils/plantUtils";
import { capitalize } from "vue";

function CollectionView(props) {
  function onSortChangeACB(evt){
    props.onSort(evt);
  }
  return (
    <div>
      <div>
        <v-card>
          <v-row>
            <v-col>Your Collection</v-col>
            <v-col
              offset-md="5"
            >
              Sort:
            </v-col>
            <v-col>
              <v-select
                model-value={props.sort}
                items={["Genus A-Z", "Genus Z-A"]}
                onUpdate:modelValue={onSortChangeACB}
              >
              </v-select>
            </v-col>
          </v-row>
        </v-card>
      </div>
      <div>{renderCollection(props.plants, props.test, props.sort)}</div>
    </div>
  );
}

function renderCollection(plants, test, order) {
  function createRowsCB(plantItem) {
    return (
      <v-expansion-panels focusable>
        <v-expansion-panel value={test} title={capitalize(plantItem[0]) + " (" + plantItem[1].length + ")"}>
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
        <v-card max-width = "150" class="mx-3" >
          <v-img src={plant.url} max-width="150" max-heigth="200" />
          <v-card-title class="plant-name">
            {capitalize(plant.scientificName.split(" ")[1])}
          </v-card-title>
        </v-card>
      </td>
    );
  }

  if (order === "Genus A-Z"){
    return (
      <div>{Object.entries(sortPlants(plants)).map(createRowsCB)}</div>
    );
  }else{
    return (
      <div>{Object.entries(sortPlants(plants)).reverse().map(createRowsCB)}</div>
    );
  }
}

export default CollectionView;
