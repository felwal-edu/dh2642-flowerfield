function UploadView(props) {

    function browseSpanClickACB(evt) {
        //props.onDishChoice(dishResult);
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
          <div class="drag-area">
            <div class="icon">
              <i class="fas"></i>
            </div>
            <span class="header">Drag & Drop</span>
            <span class="header">or <span class="browse-button" onClick={browseSpanClickACB}>browse</span></span>
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
