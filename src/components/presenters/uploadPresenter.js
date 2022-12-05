import UploadView from "../views/uploadView";
import {loadAndDisplayFile, uploadImageToAPI, abortUpload} from "../../data/uploadTemp.js";
import "../../css/upload.css";

const UploadPresenter = {
    props: ["model"],

    data() {
        return {
            authPromiseState: {},
            currentUser: undefined,
            file: null,
            isActive: false
        };
    },

    created () {
        // TODO: add to methods?

        // create listeners
        //this.dragoverListener = dragoverListenerACB.bind(this);
        //this.dragleaveListener = dragleaveListenerACB.bind(this);
        //this.dropListener = dropListenerACB.bind(this);
        //this.inputChangeListener = inputChangeListenerACB.bind(this);

        // add events TODO: change from window to the objects...
        /*
        this.dragArea.addEventListener("dragover", this.dragoverListener);
        this.dragArea.addEventListener("dragleave", this.dragleaveListenerACB);
        this.dragArea.addEventListener("drop", this.dropListener);
        this.input.addEventListener("change", this.inputChangeListener);
        */
    },

    unmounted() {
        // remove event at teardown
        this.dragArea.removeEventListener("dragover", this.dragoverListener);
        this.dragArea.removeEventListener("dragleave", this.dragleaveListenerACB);
        this.dragArea.removeEventListener("drop", this.dropListener);
        this.input.removeEventListener("change", this.inputChangeListener);
    },

    render() {
        this.dragArea = document.querySelector(".drag-area");

        function onAbortUpload(event) {
            // reset data
            this.file = null;
            this.FILE_URL = "";
            this.dragArea.classList.remove("active");
            //uploadButton.hidden = true;
            //cancleButton.hidden = true;

            abortUpload();
        }

        function browseSpanClickACB(event) {
            let input = document.querySelector('input');
            input.click();
        }

        function dragoverListenerACB(event) {
            //dragHeader.textContent = 'Release to Upload'
            //let dragArea = document.querySelector(".drag-area");
            this.isActive = true;
            //console.log(this.isActive);
            //dragArea.classList.add('active');
        }

        function dragleaveListenerACB(event) {
            //event.preventDefault();
            //dragHeader.textContent = 'Drag & Drop';
            this.isActive = false;
            //this.dragArea.classList.remove('active');
        }

        function dropListenerACB(event) {
            console.log("test");
            this.file = event.dataTransfer.files[0];
            commitFile();   // commit selected file
        }

        function inputChangeListenerACB(event) {
            this.file = this.files[0];
            // add so the border is 'active'
            //this.dragArea.classList.add("active");
            commitFile();   // commit selected file
        }

        function commitFile(){
            // check result from loadFile
            let result = loadAndDisplayFile(this.file);

            let success = result[0];
            this.FILE_URL = result[1];

            if (success == true) {
                // reveal buttons
                //uploadButton.hidden = false;
                //cancleButton.hidden = false;
            }
            else {
                // reset HTML elements
                this.dragArea.classList.remove("active");
                //uploadButton.hidden = true;
                //cancleButton.hidden = true;
            }
        }

        return (
            <UploadView onUploadImageToAPI={uploadImageToAPI(this.FILE_URL)} onAbortUpload={onAbortUpload}
                onBrowseSpanClick={browseSpanClickACB} onDragenterFile={dragoverListenerACB} onDragleaveFile={dragleaveListenerACB}
                onDropFile={dropListenerACB} onInputFileChange={inputChangeListenerACB} dragareaActive={this.isActive}/>
        );
    }
}


export default UploadPresenter;
