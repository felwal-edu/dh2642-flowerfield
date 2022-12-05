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
        props.onDropFile();
    }

    function browseSpanClickACB() {
        console.log("bingus");
        props.onBrowseSpanClick();
    }

    function inputFileChangeACB() {
        console.log("bingus");
        props.onInputFileChange();
    }

    function uploadButtonClickACB() {
        props.onUploadImageToAPI();
    }

    function cancleButtonClickACB() {
        props.onAbortUpload();
    }

    let handleChange = function () {
        console.log("bang");
        inputFileChangeACB();
    };

    return (
        <div class="upload-page">
            <div class="upload-container">
                <h3>Upload your flower image</h3>
                {console.log(props.dragareaActive === true)}
                <div class={props.dragareaActive === true ? "drag-area active" : "drag-area"}
                    onDragenter={dragenterFileACB} onDragleave={dragleaveFileACB} onDrop={dropFileACB} >
                    <div class="icon">
                    <i class="fas"></i>
                    </div>
                    <span class="header">Drag & Drop</span>
                    <span class="header">or <span class="browse-button" onClick={browseSpanClickACB}
                    onchange={console.log("test")}>browse</span></span>
                    <input type="file" hidden />
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
