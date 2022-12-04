import resolvePromise from "../network/resolvePromise";
import UploadView from "../views/uploadView";
import {loadAndDisplayFile, uploadImageToAPI} from "../data/uploadTemp.js";
import "../../css/upload.css";

const UploadPresenter = {
    props: ["model"],

    data() {
        return {
            authPromiseState: {},
            currentUser: undefined,
            file: null
        };
    },

    created () {
        this.dragArea = document.querySelector(".drag-area");
        this.input = document.querySelector('input');

        function dragoverListenerACB(event) {
            event.preventDefault();
            //dragHeader.textContent = 'Release to Upload'
            this.dragArea.classList.add('active');
        }

        function dragleaveListenerACB() {
            //event.preventDefault();
            //dragHeader.textContent = 'Drag & Drop';
            this.dragArea.classList.remove('active');
        }

        function dropListenerACB(event) {
            event.preventDefault();

            this.file = event.dataTransfer.files[0];
            commitFile();   // commit selected file
        }

        function inputChangeListenerACB() {
            this.file = this.files[0];
            // add so the border is 'active'
            this.dragArea.classList.add("active");
            commitFile();   // commit selected file
        }

        // TODO: add to methods?
        function commitFile(){
            // check result from loadFile
            let result = loadAndDisplayFile(this.file);

            let success = result[0];
            this.FILE_URL = result[1];

            if (success == true) {
                // reveal buttons
                uploadButton.hidden = false;
                cancleButton.hidden = false;
            }
            else {
                // reset HTML elements
                this.dragArea.classList.remove("active");
                uploadButton.hidden = true;
                cancleButton.hidden = true;
            }
        }

        // create listeners
        this.dragoverListener = dragoverListenerACB.bind(this);
        this.dragleaveListener = dragleaveListenerACB.bind(this);
        this.dropListener = dropListenerACB.bind(this);
        this.inputChangeListener = inputChangeListenerACB.bind(this);

        // TODO: maybe works...
        //this.$el.querySelector(".drag-area").addEventListener("dragover", this.dragoverListener);

        // add events TODO: change from window to the objects...
        this.dragArea.addEventListener("dragover", this.dragoverListener);
        this.dragArea.addEventListener("dragleave", this.dragleaveListenerACB);
        this.dragArea.addEventListener("drop", this.dropListener);
        this.input.addEventListener("change", this.inputChangeListener);
    },

    unmounted() {
        // remove event at teardown
        this.dragArea.removeEventListener("dragover", this.dragoverListener);
        this.dragArea.removeEventListener("dragleave", this.dragleaveListenerACB);
        this.dragArea.removeEventListener("drop", this.dropListener);
        this.input.removeEventListener("change", this.inputChangeListener);
    },

    render() {
        function onAbortUpload() {
            // reset data
            this.file = null;
            this.FILE_URL = "";
            this.dragArea.classList.remove("active");
            uploadButton.hidden = true;
            cancleButton.hidden = true;

            abortUpload();
        }

        function browseSpanClickACB() {
            this.input.click();
        }

        return (
            <UploadView onUploadImageToAPI={uploadImageToAPI(this.FILE_URL).bind(this)} onAbortUpload={onAbortUpload}
                onBrowseSpanClick={browseSpanClickACB}/>
        );
    }
}

export default UploadPresenter;
