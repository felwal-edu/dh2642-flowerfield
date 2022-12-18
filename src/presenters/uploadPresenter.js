import UploadView from "../views/uploadView";
import { commitFile } from "../utils/uploadUtils.js";
import "../css/upload.css";
import resolvePromise from "@/utils/resolvePromise";
//import { resolvePromiseMock } from "@/utils/resolvePromise";
import { getPlantByImage } from "@/network/plantIdService";
//import { exampleResponse } from "@/network/plantIdExample";
import useFlowerStore from "@/store/flowerStore";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils";
import log from "@/utils/logUtils";
import { mapState } from "pinia";
import LoadingView from "@/views/loadingView";

const PROBABLILITY_REJECTION_LIMIT = 0.3;

const UploadPresenter = {
  data() {
    return {
      plantPromiseState: {},
      isFileLoaded: false,
      isActive: false,
      file: null,
      fileURL: null,
      overlay: false,
      plant: null,
      uploadMessage: {},
      buttonPopupCallback: undefined
    };
  },

  computed: {
    ...mapState(useFlowerStore, {userStatus: "currentUser"})
  },

  mounted() {
    // find elements and set events to them
    this.dragArea = document.querySelector(".drag-area");
    this.input = document.querySelector("input");
  },

  render() {
    if (waitingForUserToBeSignedIn(this.userStatus, this.$router)) return <LoadingView />;

    function abortUploadACB() {
      // reset data
      this.file = null;
      this.isActive = false;
      this.isFileLoaded = false;
      this.plantPromiseState = {};  // reset here for if API call fails

      document.querySelectorAll(".btn.upload").item(0).hidden = true;
      document.querySelectorAll(".btn.cancel").item(0).hidden = true;
    }

    function browseSpanClickACB(event) {
      this.input = document.querySelector("input");
      this.input.click();
    }

    function uploadImageToAPI() {
      function processApiResultACB() {
        // reset message
        this.uploadMessage = {};

        if (this.plantPromiseState.data?.suggestions) {
          // extract relevant information
          let plant = this.plantPromiseState.data?.suggestions[0];
          log.i("probability: " + plant.probability);

          if (plant.probability < PROBABLILITY_REJECTION_LIMIT) {
            this.uploadMessage = {
              "title": "An error has occured.",
              "subhead": "Our image detector could not correctly identify a flower from your image, please upload a new image.",
              "buttonText": "OK",
            };

            this.buttonPopupCallback = abortUploadACB.bind(this);

            // show overlay
            this.overlay = true;

            // TODO: add error in box?
            // jump out of function to not set plant
            return;
          }

          this.plant = {
            "id": plant.id,
            "scientificName": plant.plant_name || "",
            "genus": plant.plant_details.structured_name.genus || "",
            "species": plant.plant_details.structured_name.species || "",
            "date": this.plantPromiseState.data.meta_data.date,
            "url": this.plantPromiseState.data.images[0].url,
          };

          // check if the plant exist already, if so we grey out the "add collection button"
          if (useFlowerStore().hasPlant(this.plant.scientificName)) {
            this.uploadMessage = {
              "title": this.plant.scientificName,
              "subhead": "Already exists in your collection.",
              "buttonText": "OK"
            };

            this.buttonPopupCallback = abortUploadACB.bind(this);
          }
          else {
            this.uploadMessage = {
              "title": "NEW! " + this.plant.scientificName,
              "subhead": "You photographed a new flower!",
              "buttonText": "Add to collection"
            };

            this.buttonPopupCallback = uploadAcceptToCollectionACB.bind(this);
          }

          this.overlay = true;
          // TODO: DISPLAY ERROR-box
        }
      }

      if (this.fileURL == null || this.fileURL == "") {
        return;
      }

      let base64 = this.fileURL.replace("data:", "").replace(/^.+,/, "");

      // REAL CALL:
      resolvePromise(getPlantByImage(base64), this.plantPromiseState, processApiResultACB.bind(this));
      // FAKE CALL:
      //resolvePromiseMock(exampleResponse, this.plantPromiseState, processApiResultACB.bind(this));
    }

    // create listeners

    function dragoverListenerACB(evt) {
      evt.preventDefault();
      this.isActive = true;
    }

    function dragleaveListenerACB() {
      this.isActive = false;
    }

    function dropListenerACB(evt) {
      evt.preventDefault();
      this.file = evt.dataTransfer.files[0];

      commitFile(this.file, function (f, success) {
        this.fileURL = f;
        this.isFileLoaded = success;
        this.isActive = success; // usefull if we fail
      }.bind(this));
    }

    function inputChangeListenerACB(evt) {
      this.file = evt.target.files[0];
      // add so the border is "active"
      this.isActive = true;

      commitFile(this.file, function (f, success) {
        this.fileURL = f;
        this.isFileLoaded = success;
        this.isActive = success;
      }.bind(this));
    }

    function uploadAcceptToCollectionACB() {
      // don't try to accept new flower if none was found from the image
      if (this.plant != null && !useFlowerStore().hasPlant(this.plant.scientificName)) {
        // only add to store if not already exists
        useFlowerStore().addPlant(this.plant);
        this.$router.push({ name: "collection" });
      }
      else {
        // close overlay
        this.overlay = false;
      }
    }

    return (
      <UploadView
        onUploadImageToAPI={uploadImageToAPI.bind(this)}
        onAbortUpload={abortUploadACB.bind(this)}
        onBrowseSpanClick={browseSpanClickACB.bind(this)}
        dragareaActive={this.isActive}
        onDragoverFile={dragoverListenerACB.bind(this)}
        onDragleaveFile={dragleaveListenerACB.bind(this)}
        onDropFile={dropListenerACB.bind(this)}
        onInputFileChange={inputChangeListenerACB.bind(this)}
        onUploadConfirmation={this.buttonPopupCallback}
        imageLoaded={this.isFileLoaded}
        promiseState={this.plantPromiseState}
        fileURL={this.fileURL}
        overlay={this.overlay}
        uploadMessage={this.uploadMessage} />
    );
  }
};

export default UploadPresenter;
