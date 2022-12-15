import { sortPlants } from "@/utils/plantUtils";
import { capitalize } from "vue";

function CollectionView(props) {
  function onSortChangeACB(evt) {
    props.onSort(evt);
  }
  function onCloseInfoACB(evt) {
    props.closePopup();
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
          <v-toolbar-items>
            <v-select
              class="pl-2 align center"
              model-value={props.sort}
              items={["Genus A-Z", "Genus Z-A"]}
              onUpdate:modelValue={onSortChangeACB}
            >
            </v-select>
          </v-toolbar-items>
        </v-toolbar>
      </div>
      <div>{renderCollection(props.plants, props.test, props.sort, props)}</div>
      <v-overlay
        class="d-flex justify-center align-center"
        persistent
        z-index={1}
        model-value={props.overlay}
        onClick:outside={onCloseInfoACB}
      >
        <v-card
          width="400"
          height="500"
        >
          <v-card-title class="text-center bg-green-lighten-3">{props.currentPlant.scientificName}</v-card-title>
          <v-img
            src={props.currentPlant.url}
            max-height="300"
            class="bg-grey-lighten-4"
          ></v-img>
          <v-card-text>Information about the plant</v-card-text>
          <v-card-actions>
            <v-row class="justify-center align-center">
              <v-btn
                onClick={onCloseInfoACB}
                color="red"
                variant="outlined"
              >
                Close
              </v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-overlay>
    </div>
  );
}

function renderCollection(plants, test, order, props) {
  function createRowsCB(plantItem) {
    return (
      <v-expansion-panels
        focusable
        model-value={[0]}
      >
        <v-expansion-panel title={capitalize(plantItem[0]) + " (" + plantItem[1].length + ")"} >
          <v-expansion-panel-text>
            <v-row class="d-flex justify-start">
              {plantItem[1].map(createCollectionColCB)}
            </v-row>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    );
  }

  function createCollectionColCB(plant) {
    function showInfoACB(evt) {
      props.openPopup(plant);
    }
    return (
      <v-col md="2">
        <v-card max-width="200" class="mx-3" onClick={showInfoACB}>
          <v-img src={plant.url} aspect-ratio="4/3" width="200" />
          <v-card-title class="text-center">
            {capitalize(plant.scientificName.split(" ")[1])}
          </v-card-title>
        </v-card>
      </v-col>
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
