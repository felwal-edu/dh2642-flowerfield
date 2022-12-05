
import { UserInfoStore } from "@/data/flowerStore";


function HomeView() {
    const store = UserInfoStore()

    function plantInfoACB(evt) {
        store.addplant("erere")
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
