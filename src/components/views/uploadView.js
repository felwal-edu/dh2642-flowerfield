function UploadView(props) {

    function dragenterFileACB(evt) {
        evt.preventDefault();
        props.onDragenterFile();
    }

    function dragleaveFileACB(evt) {
        props.onDragleaveFile();
    }

    function dropFileACB(evt) {
        evt.preventDefault();
        props.onDropFile(evt);
    }

    function browseSpanClickACB() {
        props.onBrowseSpanClick();
    }

    function inputFileChangeACB(evt) {
        props.onInputFileChange(evt.target);
    }

    function uploadButtonClickACB() {
        props.onUploadImageToAPI();
    }

    function cancleButtonClickACB() {
        props.onAbortUpload();
    }


    return (
        <div class="upload-page">
            <div class="upload-container">
                <h3>Upload your flower image</h3>
                <div class={props.dragareaActive === true ? "drag-area active" : "drag-area"}
                    onDragover={dragenterFileACB} onDragleave={dragleaveFileACB} onDrop={dropFileACB} >
                    <div class="icon">
                    <i class="fas"></i>
                    </div>
                    <span class="header">Drag & Drop</span>
                    <span class="header">or <span class="browse-button" onClick={browseSpanClickACB}>browse</span></span>
                    <input type="file" hidden onChange={inputFileChangeACB}/>

                    <span class="tip-support">PNG, JPG, JPEG</span>
                </div>
            </div>
            <div class="buttons-container">
                <button class="btn upload" hidden onClick={uploadButtonClickACB}>Upload</button>
                <button class="btn cancle" hidden onClick={cancleButtonClickACB}>Cancle</button>
            </div>
        </div>
    );
  }

  export default UploadView;
