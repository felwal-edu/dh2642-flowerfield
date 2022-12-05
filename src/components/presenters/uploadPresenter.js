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
            fileURL: "",    // This is always undefined for some reason...
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
        //this.dragArea.removeEventListener("dragover", this.dragoverListener);
        //this.dragArea.removeEventListener("dragleave", this.dragleaveListenerACB);
        //this.dragArea.removeEventListener("drop", this.dropListener);
        //this.input.removeEventListener("change", this.inputChangeListener);
    },

    render() {
        function onAbortUpload(event) {
            // reset data
            this.file = null;
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
            this.isActive = true;

            let dragArea = document.querySelector(".drag-area");
            dragArea.classList.add('active');
        }

        function dragleaveListenerACB(event) {
            //dragHeader.textContent = 'Drag & Drop';
            this.isActive = false;

            let dragArea = document.querySelector(".drag-area");
            dragArea.classList.remove('active');
        }

        function dropListenerACB(event) {
            this.file = event.dataTransfer.files[0];
            commitFile(this.file);   // commit selected file
        }

        function inputChangeListenerACB(event) {
            this.file = event.files[0];
            // add so the border is 'active'
            let dragArea = document.querySelector(".drag-area");
            dragArea.classList.add('active');

            commitFile(this.file);   // commit selected file
        }

        function addImageProcess(file) {
            return new Promise((resolve, reject) => {
                let fileReader = new FileReader()
                fileReader.readAsDataURL(file);
                fileReader.onload = () => resolve(fileReader.result)
                fileReader.onerror = reject
            })
        }

        function commitFile(file){
            let fileURL;

            if (file == null) {
                alert('No file selected.');

                //uploadButton.hidden = true;
                //cancleButton.hidden = true;
                return;
            }

            // TODO: remove metadata?
            let fileType = file.type;

            let validExtensions = ["image/png", "image/jpg", "image/jpeg"];

            // TODO: expand error to more then alert?
            if (validExtensions.includes(fileType)) {
                addImageProcess(file).then(url => {
                    console.log(url);

                    //uploadButton.hidden = true;
                    //cancleButton.hidden = true;
                });
            }
            else {
                alert('File format is not supported.');

                //uploadButton.hidden = true;
                //cancleButton.hidden = true;
                return;
            }
        }

        return (
            <UploadView onUploadImageToAPI={uploadImageToAPI} onAbortUpload={onAbortUpload}
                onBrowseSpanClick={browseSpanClickACB} onDragenterFile={dragoverListenerACB} onDragleaveFile={dragleaveListenerACB}
                onDropFile={dropListenerACB} onInputFileChange={inputChangeListenerACB} dragareaActive={this.isActive}/>
        );
    }
}


export default UploadPresenter;
