function UploadView(props) {

    function renderUploadView() {
        if (!props.imageLoaded) {
            return <div class={props.dragareaActive == true ? "drag-area active" : "drag-area"}
            onDragover={dragoverFileACB} onDragleave={dragleaveFileACB} onDrop={dropFileACB} >
                <div class="icon">

                    <i class="fas"></i>

                </div>
                <span class="header">{props.dragareaActive == true ? "Release to Upload" : "Drag & Drop"}</span>
                <span class="header">or <span class="browse-button" onClick={browseSpanClickACB}>browse</span></span>
                <input type="file" hidden onChange={inputFileChangeACB} />

                <span class="tip-support">PNG, JPG, JPEG</span>
            </div>;
        }
        else {
            return <div>
                    <div class="image-container">
                        <img src={props.fileURL} alt=""></img>
                    </div>
                    <v-overlay v-model={props.overlay}>
                    <v-card>
                        <v-card-text>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </v-card-text>
                        <v-card-actions>
                            <button onClick={testACB}>
                                Close Dialog
                            </button>
                        </v-card-actions>
                    </v-card>
                    </v-overlay>
                </div>

        }
    }

    function browseSpanClickACB() {
        props.onBrowseSpanClick();
    }

    function uploadButtonClickACB() {
        props.onUploadImageToAPI();
    }

    function cancleButtonClickACB() {
        props.onAbortUpload();
    }

    function dragoverFileACB(evt) {
        //evt.preventDefault();
        props.onDragoverFile(evt);
    }

    function dragleaveFileACB(evt) {
        props.onDragleaveFile();
    }

    function dropFileACB(evt) {
        //evt.preventDefault();
        props.onDropFile(evt);
    }

    function inputFileChangeACB(evt) {
        props.onInputFileChange(evt);
    }

    function testACB(){
        props.overlay = false;
    }

    return (
        <div class="upload-page">
            <div class="upload-container">
                <h3>Upload your flower image</h3>
                {
                    renderUploadView()
                }
            </div>
            <div class="buttons-container">
                <button class="btn upload" hidden onClick={uploadButtonClickACB}>Upload</button>
                <button class="btn cancle" hidden onClick={cancleButtonClickACB}>Cancle</button>
            </div>
        </div>
    );
  }

  export default UploadView;
