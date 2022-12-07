import UploadView from "../views/uploadView";
import {commitFile, abortUpload} from "../../data/uploadTemp.js";
import "../../css/upload.css";
import resolvePromise from "@/data/network/resolvePromise";
import { resolvePromiseMock } from "@/data/network/resolvePromise";
import { getPlantByImage } from "@/data/network/plantIdService";
import { exampleResponse } from "@/data/network/plantIdServiceMock";
import useFlowerStore from "@/data/flowerStore";

const UploadPresenter = {
  data() {
    return {
      plantPromiseState: {},
      isFileLoaded: false,
      isActive: false,
      file: null,
      fileURL: null,
      overlay: false,
      plantObject: null,
      userStatus: undefined,
      uploadMessage: {},
    };
  },

  created () {
    // TODO: WAIT FOR FIREBASE TO LOAD FIRST
    this.userStatus = useFlowerStore().currentUser;

    // TODO: extract used-more-than-once funcitonality
    useFlowerStore().$subscribe(function (mutation, state) {
      // TODO: mutation is not defined in production
      if (mutation.events.key === "currentUser") {
        // transform plant list to object with id as key
        this.userStatus = mutation.events.newValue;
      }
    }.bind(this));
  },

  mounted() {
    // find elements and set events to them
    this.dragArea = document.querySelector(".drag-area");
    this.input = document.querySelector('input');
  },

  beforeUnmount () {
  },

  render() {
    function onAbortUpload(event) {
      // reset data
      this.file = null;
      this.isActive = false;
      this.isFileLoaded = false;

      document.querySelectorAll('.btn.upload').item(0).hidden = true;
      document.querySelectorAll('.btn.cancel').item(0).hidden = true;

      abortUpload();
    }

    function browseSpanClickACB(event) {
        this.input = document.querySelector('input');
        this.input.click();
    }

    function uploadImageToAPI() {
      function notifyACB() {
        if (this.plantPromiseState.data?.suggestions) {
          // extract relevant information
          let plant = this.plantPromiseState.data?.suggestions[0];

          this.plantObject = {
            "id": plant.id,
            "scientificName": plant.plant_name,
            "genus": plant.plant_details.structured_name.genus,
            "species": plant.plant_details.structured_name.species,
            "date": this.plantPromiseState.data.meta_data.date,
            "url": this.plantPromiseState.data.images[0].url,
          };

          // check if the plant exist already, if so we grey out the "add collection button"
          if (useFlowerStore().hasPlant(this.plantObject.scientificName)) {
            this.uploadMessage = {
              "title": this.plantObject.scientificName,
              "subhead": "Already exists in your collection.",
              "buttonText": "Continue"
            };
          }
          else {
            this.uploadMessage = {
              "title": "NEW! " + this.plantObject.scientificName,
              "subhead": "You photographed a new flower!",
              "buttonText": "Add to collection"
            };
          }

          this.overlay = true;
          useFlowerStore().addPlant(this.plantObject);
        }
      }

      if (this.fileURL == null || this.fileURL == "") {
        return;
      }

      let base64 = this.fileURL.replace('data:', '').replace(/^.+,/, '');

      // REAL CALL:
      resolvePromise(getPlantByImage(base64), this.plantPromiseState, notifyACB.bind(this));

      // FAKE CALL:
      //resolvePromiseMock(exampleResponse, this.plantPromiseState, notifyACB.bind(this));
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

      commitFile(this.file, function(f, success) {
        this.fileURL = f;
        this.isFileLoaded = success;
        this.isActive = success; // usefull if we fail
      }.bind(this));
    }

    function inputChangeListenerACB(evt) {
      this.file = evt.target.files[0];
      // add so the border is 'active'
      this.isActive = true;

      commitFile(this.file, function(f, success) {
        this.fileURL = f;
        this.isFileLoaded = success;
        this.isActive = success;
      }.bind(this));
    }

    function disableOverlayACB(evt) {
      this.overlay = false;
    }

    //console.log(this.userStatus);
    if (this.userStatus === undefined) {
      return;
    }
    else if (this.userStatus === null) {
      console.log("bugn");
      this.$router.push({name: "login"});
    }
    else {
      return (
        <UploadView
          onUploadImageToAPI={uploadImageToAPI.bind(this)}
          onAbortUpload={onAbortUpload.bind(this)}
          onBrowseSpanClick={browseSpanClickACB.bind(this)}
          dragareaActive={this.isActive}
          onDragoverFile={dragoverListenerACB.bind(this)}
          onDragleaveFile={dragleaveListenerACB.bind(this)}
          onDropFile={dropListenerACB.bind(this)}
          onInputFileChange={inputChangeListenerACB.bind(this)}
          onDisableOverlay={disableOverlayACB.bind(this)}
          imageLoaded={this.isFileLoaded}
          fileURL={this.fileURL}
          overlay={this.overlay}
          uploadMessage={this.uploadMessage} />
      );
    }
  }
};

export default UploadPresenter;
