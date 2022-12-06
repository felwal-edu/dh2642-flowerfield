import useFlowerStore from "@/data/flowerStore";
import "../../main.css";

export default
function App() {
    let userStatus = useFlowerStore().currentUser;

    function renderApp() {
        useFlowerStore().$subscribe(function (mutation, state) {
            if (mutation.events.key === "currentUser") {
                // transform plant list to object with id as key
                userStatus = mutation.events.newValue;
            }
        }.bind(this));

        if (userStatus == undefined) {
            return <div id="nav">
                <router-link to="/">Home</router-link>
                <router-link to="/login">Login</router-link>
            </div>
        }
        else {
            return <div id="nav">
                <router-link to="/">Home</router-link>
                <router-link to="/upload">Upload</router-link>
                <router-link to="/collection">Collection</router-link>
                <router-link to="/profile">Profile</router-link>
                <router-link to="/login">Login</router-link>
            </div>
        }


    }

    return (
        <div>
            {renderApp()}
            <div>
                <router-view></router-view>
            </div>
        </div>
    )
}
