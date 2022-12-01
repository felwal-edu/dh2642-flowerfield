function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

let file;

delay(1000).then(() => {
    console.log('ran after 1 second1 passed');
    const dragArea = document.querySelector('.drag-area');
    const dragHeader = document.querySelector('.header');

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
        //console.log("File is dropped in drag area");

        file = event.dataTransfere.file[0];
        let fileType = file.type;

        let validExtensions = ["image/png", "image/jpg", "image/jpeg"];

        if (validExtensions.includes(fileType)) {
            //let fileReader =
        }
    });
});


