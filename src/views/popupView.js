
function PopupView(props){
    function closePopupACB(evt){
        props.closePopup();
    }
    console.log(props.currentPlant);
    return (
        <div>
            <v-card>
                <v-card-title>{props.currentPlant.scientificName}</v-card-title>
                <v-img src={props.currentPlant.url}></v-img>
                <v-card-text>Information about the plant</v-card-text>
                <v-btn onClick={closePopupACB}>Close</v-btn>
            </v-card>
        </div>
    );
}

export default PopupView;
