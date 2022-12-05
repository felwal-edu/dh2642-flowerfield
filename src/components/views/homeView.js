
import { useUserStore } from "@/data/flowerStore";
import { examplePlant } from "@/data/network/plantIdServiceMock";


function HomeView() {
    const store = useUserStore()

    function plantInfoACB(evt) {
        store.addPlant(examplePlant)
    }

    return (
        <div>
            <h1>Flower Field</h1>
            <img src="../../assets/logo.png"></img>
            <button onclick={plantInfoACB}>add plants</button>
        </div >
    )
}

export default HomeView;
