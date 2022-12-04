import resolvePromise from "../network/resolvePromise";
import UploadView from "../views/uploadView";
import "../data/uploadTemp.js";
import "../../css/upload.css";

const UploadPresenter = {
    props: ["model"],

    data() {
        return {
            authPromiseState: {},
            currentUser: undefined,
            file: null
        };
    },

    created () {
        function dragoverListenerACB(event) {
            event.preventDefault();
            //dragHeader.textContent = 'Release to Upload'
            //dragArea.classList.add('active');
        }

        function dragleaveListenerACB() {
            //event.preventDefault();
            //dragHeader.textContent = 'Drag & Drop';
            //dragArea.classList.remove('active');
        }

        function dropListenerACB(event) {
            event.preventDefault();

            this.file = event.dataTransfer.files[0];
            //loadAndDisplayFile();
        }

        function changeListenerACB() {
            this.file = this.files[0];
            // add so the border is 'active'
            //dragArea.classList.add("active");
            //loadAndDisplayFile();
        }

        // create listeners
        this.dragoverListener = dragoverListenerACB.bind(this);
        this.dragleaveListener = dragleaveListenerACB.bind(this);
        this.dropListener = dropListenerACB.bind(this);
        this.inputChangeListener = changeListenerACB.bind(this);

        // TODO: maybe works...
        this.$el.querySelector(".drag-area").addEventListener("dragover", this.dragoverListener);

        // add events TODO: change from window to the objects...
        window.addEventListener("dragover", this.dragoverListener);
        window.addEventListener("dragleave", this.dragleaveListenerACB);
        window.addEventListener("drop", this.dropListener);
        window.addEventListener("change", this.inputChangeListener);
    },

    unmounted() {
        // remove event at teardown
        window.removeEventListener("dragover", this.dragoverListener);
        window.removeEventListener("dragleave", this.dragleaveListenerACB);
        window.removeEventListener("drop", this.dropListener);
        window.removeEventListener("change", this.inputChangeListener);
    },

    render() {
        return (
        <UploadView />
        );
    }
}

export default UploadPresenter;
