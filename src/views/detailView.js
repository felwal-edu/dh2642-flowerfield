import { getRandomLoadingImage } from "@/utils/loadingUtils.js";
import { getArticleByPlantName } from "@/network/wikipediaService.js";
import log from "@/utils/logUtils";

function DetailView(props) {

  function onCloseInfoACB(evt) {
    props.closePopup();
  }

  function onDeleteACB(evt) {
    props.onDelete();
  }

  return (
    <v-overlay
      class="d-flex justify-center align-center"
      z-index={1}
      model-value={props.overlay}
      onUpdate:modelValue={onCloseInfoACB}
    >
      <v-card
        width="400"
        height="500"
      >
        <v-card-title class="text-center bg-green-lighten-3">{props.currentPlant.scientificName}</v-card-title>
        <v-img
          lazy-src={getRandomLoadingImage()}
          src={props.currentPlant.url}
          max-height="300"
          class="bg-grey-lighten-4"
        ></v-img>
        <v-card-text>Information about the plant</v-card-text>
        <div>
          {getArticleByPlantName(props.currentPlant.scientificName)}
        </div>

        <v-card-actions>
          <v-row class="justify-center align-center">
            <v-btn
              onClick={onCloseInfoACB}
              color="red"
              variant="outlined"
            >
              Close
            </v-btn>
            <v-btn
              icon="mdi-delete"
              onClick={onDeleteACB}
            ></v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-overlay>
  );
}

export default DetailView;
