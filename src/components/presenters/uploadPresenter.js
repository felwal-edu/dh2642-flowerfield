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
        };
    },

    created () {
        // TODO WAIT FOR FIREBASE TO LOAD FIRS
        this.userStatus = useFlowerStore().currentUser;
        useFlowerStore().$subscribe(function (mutation, state) {
            if (mutation.events.key === "currentUser") {
                // transform plant list to object with id as key
                this.userStatus = mutation.events.newValue;
            }
        }.bind(this));

        /*
        this.dragoverListener = dragoverListenerACB.bind(this);
        this.dragleaveListener = dragleaveListenerACB.bind(this);
        this.dropListener = dropListenerACB.bind(this);
        this.inputChangeListener = inputChangeListenerACB.bind(this);
        */
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
            document.querySelectorAll('.btn.cancle').item(0).hidden = true;

            abortUpload();
        }

        function browseSpanClickACB(event) {
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
                        "url": this.plantPromiseState.data.images[0],
                    }

                    // check if the plant exist already, if so we grey out the "add collection button"
                    //useFlowerStore.hasPlant(this.plantObject.id)

                    console.log("my plant! ");
                    console.log(this.plantObject);

                    //sendPlantResultToCollection().bind(this);
                    useFlowerStore().addPlant(this.plantObject);

                    //this.overlay = document.querySelector("bingus");
                    this.overlay = true;
                    this.overlay = false;
                }
            }

            if (this.fileURL == null || this.fileURL == "")
                return;

            let base64 = this.fileURL.replace('data:', '').replace(/^.+,/, '');

            // REAL CALL:
            //resolvePromise(getPlantByImage(base64), this.plantPromiseState, notifyACB.bind(this));

            // FAKE CALL:
            resolvePromiseMock(exampleResponse, this.plantPromiseState, notifyACB.bind(this));
        }

        function sendPlantResultToCollection() {
            console.log(this.plantObject);
            useFlowerStore.addPlant(this.plantObject);
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

        //console.log(this.userStatus);

        if (this.userStatus == undefined) {
            return;
        }
        else if (this.userStatus == null) {
            console.log("bugn");
            this.$router.push({name: "login"});
        }
        else {
            return (
                <UploadView onUploadImageToAPI={uploadImageToAPI.bind(this)} onAbortUpload={onAbortUpload.bind(this)} onBrowseSpanClick={browseSpanClickACB.bind(this)}
                dragareaActive={this.isActive} imageLoaded={this.isFileLoaded} fileURL={this.fileURL}
                onDragoverFile={dragoverListenerACB.bind(this)} onDragleaveFile={dragleaveListenerACB.bind(this)}
                    onDropFile={dropListenerACB.bind(this)} onInputFileChange={inputChangeListenerACB.bind(this)}/>
            );
        }
    }
}

export default UploadPresenter;
