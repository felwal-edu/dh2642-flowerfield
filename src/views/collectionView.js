import { sortPlantsIntoObject } from "@/utils/plantUtils.js";
import { capitalize } from "vue";
import { getRandomLoadingImage } from "@/utils/loadingUtils.js";
import "../css/collection.css";

function CollectionView(props) {
  function renderCollection(plants) {
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
      function showInfoClickACB(evt) {
        props.onOpenDetails(plant);
      }

      // get species name – and genus if there is none
      const species = plant.species || plant.genus;

      return (
        <v-col md="2">
          <v-card width="200" class="mx-3 card-hover" onClick={showInfoClickACB}>
            <v-img lazy-src={getRandomLoadingImage()} src={plant.url} height="175" cover>
              <v-container class="card-info-overlay">
                <div class="card-info-ovlerlay-text">
                  <v-icon>mdi-eye</v-icon><br />
                  Click for info
                </div>
              </v-container>
              <v-icon large class="ma-1 card-info-icon">
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

    if (props.sort === "Name A-Z") {
      return <div>{Object.entries(sortPlantsIntoObject(plants)).map(createRowsCB)}</div>;
    }
    else {
      return <div>{Object.entries(sortPlantsIntoObject(plants)).reverse().map(createRowsCB)}</div>;
    }
  }

  return <div>{renderCollection(props.searchStatus ? props.searchQueryPlants : props.plants)}</div>;
}

export default CollectionView;
