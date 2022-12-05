function UploadView(props) {

    function renderUploadView() {

        if (!props.imageLoaded) {
            return <div class={props.dragareaActive == true ? "drag-area active" : "drag-area"} >
                <div class="icon">

                    <i class="fas"></i>

                </div>
                <span class="header">{props.dragareaActive == true ? "Release to Upload" : "Drag & Drop"}</span>
                <span class="header">or <span class="browse-button" onClick={browseSpanClickACB}>browse</span></span>
                <input type="file" hidden />

                <span class="tip-support">PNG, JPG, JPEG</span>
            </div>;
        }
        else {
            return <div class="image-container">
                <img src={props.fileURL} alt=""></img>
            </div>
        }
    }

    function browseSpanClickACB() {
        props.onBrowseSpanClick();
    }

    function uploadButtonClickACB() {
        props.onUploadImageToAPI(props.fileURL)
    }

    function cancleButtonClickACB() {
        props.onAbortUpload();
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
