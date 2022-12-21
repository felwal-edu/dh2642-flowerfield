import promiseNoData from "./promiseNoData.js";
import errorIcon from "@/assets/icons/warning.png";
import DialogView from "./dialogView";

function UploadView(props) {
  function browseSpanClickACB(evt) {
    props.onBrowse();
  }

  function dragoverFileACB(evt) {
    evt.preventDefault();
    props.onDragoverFile();
  }

  function dragleaveFileACB(evt) {
    props.onDragleaveFile();
  }

  function dropFileACB(evt) {
    evt.preventDefault();
    props.onDropFile(evt.dataTransfer.files[0]);
  }

  function inputFileChangeACB(evt) {
    props.onInputFileChange(evt.target.files[0]);
  }

  function uploadConfirmationACB() {
    props.onUploadConfirmation();
  }

  function renderUploadView() {
    function renderInstructions() {
      if (props.imageLoaded) {
        return (
          <div class="image-container">
            <img src={props.fileURL} alt="" />
          </div>
        );
      }
      else {
        return (
          <div
            class={props.dragareaActive ? "drag-area active" : "drag-area"}
            onDragover={dragoverFileACB}
            onDragleave={dragleaveFileACB}
            onDrop={dropFileACB}>

            <div class="icon">
              <img draggable="false" src="https://img.icons8.com/color/96/null/stack-of-photos--v1.png"/>
            </div>
            <span class="header">{props.dragareaActive ? "Release to Upload" : "Drag & Drop"}</span>
            <span class="header">
              or <span class="browse-button" onClick={browseSpanClickACB}>browse files</span>
            </span>
            <input type="file" accept="image/png, image/jpg, image/jpeg" hidden onChange={inputFileChangeACB} />
            <span class="tip-support">PNG, JPG, JPEG</span>
          </div>
        );
      }
    }

    function renderResults() {
      return (
        <DialogView
          title={props.uploadMessage.title}
          message={props.uploadMessage.subhead}
          buttonPrimaryText={props.uploadMessage.buttonText}
          onButtonPrimaryClick={uploadConfirmationACB}
          onDismiss={uploadConfirmationACB} />
      );
    }

    function renderError() {
      return (
        <div class="drag-area error">
          <div class="icon">
              <img src={errorIcon} />
            </div>
            <span class="header">{"Something went wrong!"}</span>
            <span class="header">
              <span class="cancel-text-button" onClick={cancelButtonClickACB}>Cancel</span> and try again
            </span>
            <span class="tip-support">Tip: try a different picture.</span>
        </div>
      );
    }

    return !props.promiseState.promise
      ? renderInstructions()
      : promiseNoData(props.promiseState, renderError) || renderResults();
  }

  function uploadButtonClickACB() {
    props.onUploadImageToAPI();
  }

  function cancelButtonClickACB() {
    props.onAbortUpload();
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
