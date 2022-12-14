import { getRandomLoadingImage } from "@/utils/loadingUtils.js";
import promiseNoData from "./promiseNoData";
import "../css/details.css";

function DetailView(props) {
  function onCloseInfoACB(evt) {
    props.onClosePopup();
  }

  function onDeleteACB(evt) {
    props.onDelete();
  }

  function renderDetails() {
    function renderError() {
      return <div><span>No description for plant was found.</span></div>;
    }

    return (
      <v-card
        width="400"
        height="575">
        <v-card
          width="400"
          height="500"
          style="overflow-y:scroll;"
          variant="flat">

          <v-card-title class="text-center bg-green-lighten-3 detail-title">{props.currentPlant.scientificName}</v-card-title>
          <v-img
            lazy-src={getRandomLoadingImage()}
            src={props.currentPlant.url}
            max-height="300"
            class="bg-grey-lighten-4" />
          <v-card-text class="details-upload-text">Uploaded: {props.currentPlant.date}</v-card-text>
          <v-card-text class="details-header">Information about the plant</v-card-text>
          <v-container class="mt-n8" id="plantdetails" justify="center">
            {
              props.descriptionState.promise
                // v-html is used to insert html strings properly formatted
                ? promiseNoData(props.descriptionState, renderError, true) || <p v-html={props.descriptionState.data} />
                : ""
            }
          </v-container>

        </v-card>
        <v-row class="justify-center align-center">
          <v-btn
            onClick={onCloseInfoACB}
            variant="outlined"
            class="mr-2 mt-7">

            Close
          </v-btn>
          <v-btn
            icon="mdi-delete"
            color="red"
            onClick={onDeleteACB}
            class="ml-2 mt-7"/>
        </v-row>
      </v-card>
    );
  }

  return (
    <v-overlay
      class="d-flex justify-center align-center"
      z-index={1}
      model-value={true}
      onUpdate:modelValue={onCloseInfoACB}>

      {renderDetails()}
    </v-overlay>
  );
}

export default DetailView;
