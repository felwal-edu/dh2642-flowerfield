import { sortPlantsIntoObject } from "@/utils/plantUtils";
import { capitalize } from "vue";
// TODO: add import for all icons
import loading_flower from "@/assets/loading_icons/loading_icon_1.png";
import "../css/collection.css";

function CollectionView(props) {
  function onSortChangeACB(evt) {
    props.onSort(evt);
  }
  function onIconClickACB(evt){
    props.onSearch();
  }
  function onInputACB(evt){
    props.updateQuery(evt);
  }

  return (
    <div>
      <div>
        <v-toolbar color="#96c29f">
          <v-toolbar-title>
            <h2 class="header-font-collection">{props.username == "" ? "Your Collection" : props.username}</h2>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-text-field
            class="mt-8 mr-2"
            loading={props.searchStatus}
            append-icon={props.icon}
            onClick:append={onIconClickACB}
            onUpdate:modelValue={onInputACB}
          ></v-text-field>
          <v-toolbar-items>
            <v-select
              class="pl-2 mt-2 mr-3"
              model-value={props.sort}
              items={["Genus A-Z", "Genus Z-A"]}
              onUpdate:modelValue={onSortChangeACB}
            >
            </v-select>
          </v-toolbar-items>
        </v-toolbar>
      </div>
      <div>{checkRender(props)}</div>
    </div>
  );
}

function checkRender(props){
  if (!props.searchStatus){
    return renderCollection(props.plants, props.sort, props.openPopup);
  } else{
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

  console.log(plants, "THTHTAHHTAHAHTATH");
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
