import promiseNoData from "./promiseNodata";

function UploadView(props) {
  function renderUploadView() {
    function renderInstructions() {
      return (
        <div
          class={props.dragareaActive === true ? "drag-area active" : "drag-area"}
          onDragover={dragoverFileACB}
          onDragleave={dragleaveFileACB}
          onDrop={dropFileACB}>

          <div class="icon">
            <img src="https://img.icons8.com/color/96/null/stack-of-photos--v1.png" />
          </div>
          <span class="header">{props.dragareaActive == true ? "Release to Upload" : "Drag & Drop"}</span>
          <span class="header">
            or <span class="browse-button" onClick={browseSpanClickACB}>browse</span>
          </span>
          <input type="file" hidden onChange={inputFileChangeACB} />
          <span class="tip-support">PNG, JPG, JPEG</span>
        </div>
      )
    }

    function renderResults() {
      return (
        <div>
          <div class="image-container">
            <img src={props.fileURL} alt=""></img>
          </div>
          <v-overlay v-model={props.overlay} class="justify-center" justify="center">
            <v-row align="center" justify="center">
              <v-card>
                <v-card-title class="justify-center">{props.uploadMessage.title}</v-card-title>
                <v-card-subtitle class="justify-center">{props.uploadMessage.subhead}</v-card-subtitle>
                <v-card-actions>
                  <v-btn color="primary" block onClick={uploadConfirmationACB}>{props.uploadMessage.buttonText}</v-btn>
                </v-card-actions>
              </v-card>
            </v-row>
          </v-overlay>
        </div>
      );
    }

    return !props.promiseState.promise
      ? renderInstructions()
      : promiseNoData(props.promiseState) || renderResults();
  }

  function browseSpanClickACB() {
    props.onBrowseSpanClick();
  }

  function uploadButtonClickACB() {
    props.onUploadImageToAPI();
  }

  function cancelButtonClickACB() {
    props.onAbortUpload();
  }

  function dragoverFileACB(evt) {
    props.onDragoverFile(evt);
  }

  function dragleaveFileACB(evt) {
    props.onDragleaveFile();
  }

  function dropFileACB(evt) {
    props.onDropFile(evt);
  }

  function inputFileChangeACB(evt) {
    props.onInputFileChange(evt);
  }

  function uploadConfirmationACB() {
    props.onUploadConfirmation();
  }

  return (
    <div class="upload-page">
      <div class="upload-container">
        <h3>Upload your flower image</h3>
        {renderUploadView()}
      </div>
      <div class="buttons-container">
        <button class="btn upload" hidden onClick={uploadButtonClickACB}>Upload</button>
        <button class="btn cancel" hidden onClick={cancelButtonClickACB}>Cancel</button>
      </div>
    </div>
  );
}

export default UploadView;
