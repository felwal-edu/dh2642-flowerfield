import useFlowerStore from "@/store/flowerStore";
import "../css/main.css";

export default function App() {
  function renderApp() {
    // logged out or waiting for initialization
    if (!useFlowerStore().currentUser) {
      return (
        <v-toolbar-items class="hidden-sm-and-down">
          <router-link to="/">
            <v-btn text size="80">Home</v-btn>
          </router-link>
          <router-link to="/login">
            <v-btn text size="80">Login</v-btn>
          </router-link>
          <router-link to="/signup">
            <v-btn text size="80">SignUp</v-btn>
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
          <v-toolbar-title>
            <router-link to="/">
              <p class="nav-title">Flowerfield</p>
            </router-link>
          </v-toolbar-title>
          <v-spacer />
          {renderApp()}
        </v-app-bar>
        <div>
          <router-view />
        </div>
      </v-app>
    </div>
  );
}
