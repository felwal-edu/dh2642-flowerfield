function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

delay(1000).then(() => {
    console.log('ran after 1 second1 passed');
    let file;
    let fileURL;

    const dragArea = document.querySelector('.drag-area');
    const dragHeader = document.querySelector('.header');

    let browseButton = document.querySelector('.browse-button');
    let uploadButton = document.querySelectorAll('.btn.upload');    // querySelectorAll for 2-classes (must have both)
    let cancleButton = document.querySelectorAll('.btn.cancle');
    let input = document.querySelector('input');

    // link click from browse button to input file browser
    browseButton.onclick = () => {
        input.click();
    };

    uploadButton.onclick = () => {
        uploadImageToAPI();
    };

    input.addEventListener('change', function () {
        file = this.files[0];
        // add so the border is 'active'
        dragArea.classList.add("active");
        loadAndDisplayFile();
    });

    dragArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dragHeader.textContent = 'Release to Upload'
        dragArea.classList.add('active');
        //console.log("File is in drag area");
    });

    dragArea.addEventListener('dragleave', () => {
        //console.log("File left drag area");
        dragHeader.textContent = 'Drag & Drop';
        dragArea.classList.remove('active');
    });

    dragArea.addEventListener('drop', (event) => {
        event.preventDefault();
        console.log("File is dropped in drag area");

        file = event.dataTransfer.files[0];
        loadAndDisplayFile();
    });

    function loadAndDisplayFile() {
        // TODO: remove metadata?
        let fileType = file.type;

        let validExtensions = ["image/png", "image/jpg", "image/jpeg"];

        // TODO: expand error to more then alert?
        if (validExtensions.includes(fileType)) {
            let fileReader = new FileReader();

            fileReader.onload = () => {
                let fileURL = fileReader.result;
                let imgTag = `<img src="${fileURL}" alt="">`;
                dragArea.innerHTML = imgTag;
            };
            fileURL = fileReader.readAsDataURL(file);

            // reveal buttons
            uploadButton.hidden = false;
            cancleButton.hidden = false;
        }
        else {
            alert('File format is not supported.');

            // reset HTML elements
            dragArea.classList.remove("active");
            uploadButton.hidden = true;
            cancleButton.hidden = true;
        }
    }

    function displayScanButton() {

    }

    function uploadImageToAPI() {
        console.log("uploading to API...");
    }
});
