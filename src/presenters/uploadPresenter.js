import UploadView from "../views/uploadView";
import { commitFile } from "../utils/uploadUtils.js";
import "../css/upload.css";
import resolvePromise from "@/utils/resolvePromise";
import { getPlantByImage } from "@/network/plantIdService";
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
      isDragAreaHintActive: false,
      file: null,
      fileURL: null,
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
      this.isDragAreaHintActive = false;
      this.isFileLoaded = false;
      this.plantPromiseState = {}; // reset here for if API call fails

      document.querySelectorAll(".btn.upload").item(0).hidden = true;
      document.querySelectorAll(".btn.cancel").item(0).hidden = true;
    }

    function browseACB() {
      this.input = document.querySelector("input");
      this.input.click();
    }

    function uploadImageToAPI() {
      function processAPIResultACB() {
        // reset message
        this.uploadMessage = {};

        if (this.plantPromiseState.data?.suggestions) {
          // extract relevant information
          let plant = this.plantPromiseState.data?.suggestions[0];
          log.i("probability: " + plant.probability);

          // we want to reject pictures which are unlikely to be flowers
          if (plant.probability < PROBABLILITY_REJECTION_LIMIT) {
            this.uploadMessage = {
              "title": "Flower could not identified",
              "subhead": "Please try again with another image.",
              "buttonText": "OK",
            };

            this.buttonPopupCallback = abortUploadACB.bind(this);

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

          // TODO: DISPLAY ERROR-box
        }
      }

      if (this.fileURL === null || this.fileURL === "") return;

      const base64EncodedImage = this.fileURL.replace("data:", "").replace(/^.+,/, "");
      resolvePromise(getPlantByImage(base64EncodedImage), this.plantPromiseState, processAPIResultACB.bind(this));
    }

    // create listeners

    function enableDragoverHintACB() {
      this.isDragAreaHintActive = true;
    }

    function disableDragoverHintACB() {
      this.isDragAreaHintActive = false;
    }

    function setFileFromDropACB(file) {
      this.file = file;

      commitFile(this.file, function (f, success) {
        this.fileURL = f;
        this.isFileLoaded = success;
        this.isDragAreaHintActive = success; // usefull if we fail
      }.bind(this));
    }

    function setFileFromBrowseACB(file) {
      this.isDragAreaHintActive = true; // add so the border is "active"
      setFileFromDropACB.bind(this)(file);
    }

    function uploadAcceptToCollectionACB() {
      // don't try to accept new flower if none was found from the image
      // or the flower already exists
      if (this.plant !== null && !useFlowerStore().hasPlant(this.plant.scientificName)) {
        useFlowerStore().addPlant(this.plant);
        this.$router.push({name: "collection"});
      }
    }

    return (
      <UploadView
        onUploadImageToAPI={uploadImageToAPI.bind(this)}
        onAbortUpload={abortUploadACB.bind(this)}
        onBrowse={browseACB.bind(this)}
        dragareaActive={this.isDragAreaHintActive}
        onDragoverFile={enableDragoverHintACB.bind(this)}
        onDragleaveFile={disableDragoverHintACB.bind(this)}
        onDropFile={setFileFromDropACB.bind(this)}
        onInputFileChange={setFileFromBrowseACB.bind(this)}
        onUploadConfirmation={this.buttonPopupCallback}
        imageLoaded={this.isFileLoaded}
        promiseState={this.plantPromiseState}
        fileURL={this.fileURL}
        uploadMessage={this.uploadMessage} />
    );
  }
};

export default UploadPresenter;
