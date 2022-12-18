import { sortPlantsIntoObject } from "@/utils/plantUtils";
import { capitalize } from "vue";
import { getRandomLoadingImage } from "@/utils/loadingUtils.js";
import "../css/collection.css";
import log from "@/utils/logUtils";

function CollectionView(props) {

  return (
    <div>{checkRender(props)}</div>
  );
}

function checkRender(props) {
  if (!props.searchStatus) {
    return renderCollection(props.plants, props.sort, props.openPopup);
  } else {
    return renderCollection(props.searchQueryPlants, props.sort, props.openPopup);
  }
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

    // get species name – and genus if there is none
    const species = plant.species || plant.genus;

    return (
      <v-col md="2">
        <v-card width="200" class="mx-3 card-hover" onClick={showInfoACB}>
          <v-img lazy-src={getRandomLoadingImage()} src={plant.url} height="175" cover>
            <v-container class="card-info-overlay">
              <div class="card-info-ovlerlay-text">
                <v-icon>mdi-eye</v-icon><br/>
                Click for info
              </div>
            </v-container>
            <v-icon large color="white darken-2" class="ma-1 card-info-icon">
              mdi-information
            </v-icon>
          </v-img>
          <v-card-title class="text-center">
            {capitalize(species)}
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
