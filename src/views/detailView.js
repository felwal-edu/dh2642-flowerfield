import loading_flower from "@/assets/loading_icons/loading_icon_1.png"

function DetailView(props){

    function onCloseInfoACB(evt) {
        props.closePopup();
    }

    function onDeleteACB(evt){
      console.log("DELETE THE PLANT")
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
