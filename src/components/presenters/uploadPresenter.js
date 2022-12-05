import UploadView from "../views/uploadView";
import {commitFile, uploadImageToAPI, abortUpload} from "../../data/uploadTemp.js";
import "../../css/upload.css";

const UploadPresenter = {
    props: ["model"],

    data() {
        return {
            authPromiseState: {},
            currentUser: undefined,
            isFileLoaded: false,
            isActive: false,
            file: null,
            fileURL: null,
        };
    },

    created () {
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

        this.dragoverListener = dragoverListenerACB.bind(this);
        this.dragleaveListener = dragleaveListenerACB.bind(this);
        this.dropListener = dropListenerACB.bind(this);
        this.inputChangeListener = inputChangeListenerACB.bind(this);
    },

    mounted() {
        // find elements and set events to them
        this.dragArea = document.querySelector(".drag-area");
        this.input = document.querySelector('input');

        this.dragArea.addEventListener("dragover", this.dragoverListener);
        this.dragArea.addEventListener("dragleave", this.dragleaveListener);
        this.dragArea.addEventListener("drop", this.dropListener);
        this.input.addEventListener("change", this.inputChangeListener);
    },

    beforeUnmount () {
        let dragArea = document.querySelector(".drag-area");
        let input = document.querySelector('input');

        // if we render the image, drag-area is null
        if (dragArea != null) {
            // remove event at teardown
            dragArea.removeEventListener("dragover", this.dragoverListener);
            dragArea.removeEventListener("dragleave", this.dragleaveListenerACB);
            dragArea.removeEventListener("drop", this.dropListener);
        }

        if (input != null) {
            input.removeEventListener("change", this.inputChangeListener);
        }
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

        return (
            <UploadView onUploadImageToAPI={uploadImageToAPI} onAbortUpload={onAbortUpload.bind(this)}
                onBrowseSpanClick={browseSpanClickACB.bind(this)} dragareaActive={this.isActive}
                imageLoaded={this.isFileLoaded} fileURL={this.fileURL}/>
        );
    }
}




export default UploadPresenter;
