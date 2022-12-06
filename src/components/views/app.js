import useFlowerStore from "@/data/flowerStore";
import "../../main.css";

export default function App() {
  let userStatus = useFlowerStore().currentUser;

  function renderApp() {
    useFlowerStore().$subscribe(function (mutation, state) {
      if (mutation.events.key === "currentUser") {
        // transform plant list to object with id as key
        userStatus = mutation.events.newValue;
      }
    }.bind(this));

    // logged out or waiting for initialization
    if (!userStatus) {
      return (
        <v-toolbar-items class="hidden-sm-and-down">
          <router-link to="/">
            <v-btn text size="80">Home</v-btn>
          </router-link>
          <router-link to="/login">
            <v-btn text size="80">Login</v-btn>
          </router-link>
        </v-toolbar-items>
      );
    }

    return (
      <v-toolbar-items class="hidden-sm-and-down">
        <router-link to="/">
            <v-btn text size="80">Home</v-btn>
        </router-link>
        <router-link to="/upload">
            <v-btn text size="80">Upload</v-btn>
        </router-link>
        <router-link to="/collection">
            <v-btn text height="80" width="110">Collection</v-btn>
        </router-link>
        <router-link to="/profile">
            <v-btn text size="80">Profile</v-btn>
        </router-link>
      </v-toolbar-items>
    );
  }

  return (
    <div>
      <v-app>
        <v-app-bar fixed dense>
          <v-toolbar-title><p class="nav-title">Flowerfield</p></v-toolbar-title>
          <v-spacer></v-spacer>
          {renderApp()}
        </v-app-bar>
        <div>
          <router-view></router-view>
        </div>
      </v-app>
    </div>
  );
}
