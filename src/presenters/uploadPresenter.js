import UploadView from "../views/uploadView";
import { commitFile, abortUpload } from "../utils/uploadUtils.js";
import "../css/upload.css";
import resolvePromise from "@/utils/resolvePromise";
import { resolvePromiseMock } from "@/utils/resolvePromise";
import { getPlantByImage } from "@/network/plantIdService";
import { exampleResponse } from "@/network/plantIdExample";
import useFlowerStore from "@/store/flowerStore";
import { watch } from "vue";
import { waitingForUserToBeSignedIn } from "@/utils/userUtils";

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
      userStatus: undefined,
      uploadMessage: {},
    };
  },

  created() {
    this.userStatus = useFlowerStore().currentUser;

    // watch user status
    watch(() => useFlowerStore().currentUser, function (newUser) {
      this.userStatus = newUser;
    }.bind(this));
  },

  mounted() {
    // find elements and set events to them
    this.dragArea = document.querySelector(".drag-area");
    this.input = document.querySelector("input");
  },

  render() {
    if (waitingForUserToBeSignedIn(this.userStatus, this.$router)) return;

    function abortUploadACB() {
      // reset data
      this.file = null;
      this.isActive = false;
      this.isFileLoaded = false;

      document.querySelectorAll(".btn.upload").item(0).hidden = true;
      document.querySelectorAll(".btn.cancel").item(0).hidden = true;

      abortUpload();
    }

    function browseSpanClickACB(event) {
      this.input = document.querySelector("input");
      this.input.click();
    }

    function uploadImageToAPI() {
      function processApiResultACB() {
        if (this.plantPromiseState.data?.suggestions) {
          // extract relevant information
          // TODO: only if > X% chance
          let plant = this.plantPromiseState.data?.suggestions[0];

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
              "buttonText": "Continue"
            };
          }
          else {
            this.uploadMessage = {
              "title": "NEW! " + this.plant.scientificName,
              "subhead": "You photographed a new flower!",
              "buttonText": "Add to collection"
            };
          }

          this.overlay = true;
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

    function uploadConfirmationACB() {
      if (!useFlowerStore().hasPlant(this.plant.scientificName)) {
        // only add to store if not already exists
        useFlowerStore().addPlant(this.plant);
        this.$router.push({ name: "collection" });
      }
      else {
        this.overlay = false;
        this.uploadMessage = {};
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
        onUploadConfirmation={uploadConfirmationACB.bind(this)}
        imageLoaded={this.isFileLoaded}
        promiseState={this.plantPromiseState}
        fileURL={this.fileURL}
        overlay={this.overlay}
        uploadMessage={this.uploadMessage} />
    );
  }
};

export default UploadPresenter;
