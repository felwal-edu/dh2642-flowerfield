
import useFlowerStore  from "@/data/flowerStore";
import { examplePlant } from "@/data/network/plantIdServiceMock";
import logopath from "@/assets/testlogo.png";
import background from "@/assets/home_parallax.jpg";
import "@/css/home.css"


function HomeView() {
    const store = useFlowerStore()

    function plantInfoACB(evt) {
        store.addPlant(examplePlant)
    }

    return (
        <div>
            <v-parallax height="600" src={background}>
                <div class="d-flex flex-column fill-height justify-center align-center text-white">
                    <div class="landing-page">
                        <img class="logo" src={logopath}></img>
                    </div>
                </div>
            </v-parallax>


            <button onclick={plantInfoACB}>add plants</button>
            <v-card text="..."></v-card>
            <div class="information-page">
                This is a test to try this websites parallax effect! Scroll down and try it please!
            </div>
        </div>
    )
}

export default HomeView;
