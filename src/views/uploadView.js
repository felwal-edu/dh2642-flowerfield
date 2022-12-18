import promiseNoData from "./promiseNodata";
import errorIcon from "@/assets/icons/warning.png";
import DialogView from "./dialogView";

function UploadView(props) {
  function renderUploadView() {
    function renderInstructions() {
      if (props.imageLoaded) {
        return (
          <div class="image-container">
            <img src={props.fileURL} alt=""></img>
          </div>
        )
      }
      else {
        return (
          <div
            class={props.dragareaActive === true ? "drag-area active" : "drag-area"}
            onDragover={dragoverFileACB}
            onDragleave={dragleaveFileACB}
            onDrop={dropFileACB}>

            <div class="icon">
              <img draggable="false" src="https://img.icons8.com/color/96/null/stack-of-photos--v1.png"/>
            </div>
            <span class="header">{props.dragareaActive == true ? "Release to Upload" : "Drag & Drop"}</span>
            <span class="header">
              or <span class="browse-button" onClick={browseSpanClickACB}>browse</span>
            </span>
            <input type="file" accept="image/png, image/jpg, image/jpeg" hidden onChange={inputFileChangeACB} />
            <span class="tip-support">PNG, JPG, JPEG</span>
          </div>
        )
      }
    }

    function renderResults() {
      return (
        <DialogView
          title={props.uploadMessage.title}
          message={props.uploadMessage.subhead}
          buttonPrimaryText={props.uploadMessage.buttonText}
          onButtonPrimaryClick={uploadConfirmationACB} />
      );
    }

    function renderError() {
      return (
        <div class="drag-area error">
          <div class="icon">
              <img src={errorIcon}/>
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
