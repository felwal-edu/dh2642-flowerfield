function addImageProcess(file) {
  return new Promise((resolve, reject) => {
    let fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = reject;
  })
}

export function commitFile(file, _callback) {
  if (file === null) {
    alert("No file selected.");
    return null;
  }

  // TODO: remove metadata?
  let fileType = file.type;
  let validExtensions = ["image/png", "image/jpg", "image/jpeg"];

  // TODO: expand error to more then alert?
  if (validExtensions.includes(fileType)) {
    addImageProcess(file).then(url => {
      document.querySelectorAll(".btn.upload").item(0).hidden = false;
      document.querySelectorAll(".btn.cancel").item(0).hidden = false;

      _callback(url, true);
    });
  }
  else {
    alert("File format is not supported.");

    document.querySelectorAll(".btn.upload").item(0).hidden = true;
    document.querySelectorAll(".btn.cancel").item(0).hidden = true;
    _callback(null, false);
  }
}
