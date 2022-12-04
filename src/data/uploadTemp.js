function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

delay(1000).then(() => {
    console.log('ran after 1 second passed');
    let file;
    let fileURL;

    const dragHeader = document.querySelector('.header');

    let browseButton = document.querySelector('.browse-button');
    let uploadButton = document.querySelectorAll('.btn.upload').item(0);    // querySelectorAll for 2-classes (must have both)
    let cancleButton = document.querySelectorAll('.btn.cancle').item(0);
    let input = document.querySelector('input');

    // link click from browse button to input file browser
    browseButton.onclick = () => {
        input.click();
    };

    uploadButton.onclick = () => {
        uploadImageToAPI();
    };

    cancleButton.onclick = () => {

    }
});

export function loadAndDisplayFile(file) {
    let fileURL;

    if (file == null) {
        alert('No file selected.');
        return [false, ""]
    }

    // TODO: remove metadata?
    let fileType = file.type;

    let validExtensions = ["image/png", "image/jpg", "image/jpeg"];

    // TODO: expand error to more then alert?
    if (validExtensions.includes(fileType)) {
        let fileReader = new FileReader();

        fileReader.onload = () => {
            fileURL = fileReader.result;
            let imgTag = `<img src="${fileURL}" alt="">`;
            // TODO: find better solution than just replacing..
            // append and hide?
            //dragArea.innerHTML = imgTag;
        };
        fileReader.readAsDataURL(file);

        return [true, fileURL]
    }
    else {
        alert('File format is not supported.');

        return [false, ""]
    }
}

export function uploadImageToAPI(fileURL) {
    console.log("uploading to API...");
    let base64 = fileURL.replace('data:', '').replace(/^.+,/, '');

    console.log(base64);
    //return base64;
}

export function abortUpload() {

}

//export {loadAndDisplayFile, uploadImageToAPI, abortUpload}
