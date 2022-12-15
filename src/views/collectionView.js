import { sortPlantsIntoObject } from "@/utils/plantUtils";
import { capitalize } from "vue";
import loading_flower from "@/assets/loading_flowers.jpg";

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
        <v-toolbar color="#96c29f">
          <v-toolbar-title>Your Collection</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            class="mt-8"
          ></v-text-field>
          <v-toolbar-items>
            <v-select
              class="pl-2 mt-2"
              model-value={props.sort}
              items={["Genus A-Z", "Genus Z-A"]}
              onUpdate:modelValue={onSortChangeACB}
              solo
            >
            </v-select>
          </v-toolbar-items>
        </v-toolbar>
      </div>
      <div>{renderCollection(props.plants, props.sort, props.openPopup)}</div>
      <v-overlay
        class="d-flex justify-center align-center"
        z-index={1}
        model-value={props.overlay}
        onUpdate:modelValue={onCloseInfoACB}
        onClick:outside={onCloseInfoACB}
      >
        <v-card
          width="400"
          height="500"
        >
          <v-card-title class="text-center bg-green-lighten-3">{props.currentPlant.scientificName}</v-card-title>
          <v-img
            lazy-src={loading_flower}
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

function renderCollection(plants, order, openPopup) {
  function createRowsCB(plantItem) {
    return (
      <v-expansion-panels
        focusable
        model-value={[0]}>
        <v-expansion-panel title={capitalize(plantItem[0]) + " (" + plantItem[1].length + ")"}>
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
      openPopup(plant);
    }
    return (
      <v-col md="2">
        <v-card width="200" class="mx-3" onClick={showInfoACB}>
          <v-img lazy-src={loading_flower} src={plant.url} height="175" cover/>
          <v-card-title class="text-center">
            {capitalize(plant.scientificName.split(" ")[1])}
          </v-card-title>
        </v-card>
      </v-col>
    );
  }

  if (order === "Genus A-Z") {
    return (
      <div>{Object.entries(sortPlantsIntoObject(plants)).map(createRowsCB)}</div>
    );
  } else {
    return (
      <div>{Object.entries(sortPlantsIntoObject(plants)).reverse().map(createRowsCB)}</div>
    );
  }
}

export default CollectionView;
