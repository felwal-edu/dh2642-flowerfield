function addImageProcess(file) {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.onerror = reject;
  });
}

export function commitFile(file, notifyACB) {
  if (file === null) {
    alert("No file selected.");
    return null;
  }

  const fileType = file.type;
  const validExtensions = ["image/png", "image/jpg", "image/jpeg"];

  if (validExtensions.includes(fileType)) {
    addImageProcess(file).then(url => {
      document.querySelectorAll(".btn.upload").item(0).hidden = false;
      document.querySelectorAll(".btn.cancel").item(0).hidden = false;

      notifyACB(url, true);
    });
  }
  else {
    alert("File format is not supported.");

    document.querySelectorAll(".btn.upload").item(0).hidden = true;
    document.querySelectorAll(".btn.cancel").item(0).hidden = true;

    notifyACB(null, false);
  }
}
