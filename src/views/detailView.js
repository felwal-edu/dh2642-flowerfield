import { getRandomLoadingImage } from "@/utils/loadingUtils.js";
import log from "@/utils/logUtils";
import promiseNoData from "./promiseNodata";
import "../css/details.css";

function DetailView(props) {

  function onCloseInfoACB(evt) {
    props.closePopup();
  }

  function onDeleteACB(evt) {
    props.onDelete();
  }
    function renderDetails() {
      function renderError() {
        return <div><span>No description for plant was found.</span></div>
      }

      return <v-card
        width="400"
        height="500"
        style="overflow-y:scroll;"
      >
        <v-card-title class="text-center bg-green-lighten-3">{props.currentPlant.scientificName}</v-card-title>
        <v-img
          lazy-src={getRandomLoadingImage()}
          src={props.currentPlant.url}
          max-height="300"
          class="bg-grey-lighten-4"
        ></v-img>
        <v-card-text class="details-header">Information about the plant</v-card-text>
        <v-container class="mt-n8" id="plantdetails" justify="center">
          {!props.descriptionState.promise
            ? ""
            : promiseNoData(props.descriptionState, renderError) || ""}
        </v-container>
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
    }

    return (
      <v-overlay
        class="d-flex justify-center align-center"
        z-index={1}
        model-value={props.overlay}
        onUpdate:modelValue={onCloseInfoACB}
      >
        {renderDetails()}
      </v-overlay>
    );
}

export default DetailView;
