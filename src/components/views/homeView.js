import logopath from "@/assets/testlogo.png";
import background from "@/assets/home_parallax.jpg";
import "@/css/home.css"

function HomeView(props) {

  function renderLandingPageButton() {
    if(props.userStatus === undefined) {
        return <router-link to="/login">
            <v-btn /*color="#a02a3d"*/ variant="tonal">Get Started!</v-btn>
        </router-link>
    }
    else {
        return <router-link to="/upload">
            <v-btn /*color="#a02a3d"*/ variant="tonal">Upload Flower!</v-btn>
        </router-link>
    }
  }

  return (
    <div>
      <v-parallax height="600" src={background}>
        <div class="d-flex flex-column fill-height justify-center align-center text-white">
          <div class="landing-page center">
            <img class="logo" src={logopath}></img>
            <p class="subheader">Flowers worth Remembering</p>
            {renderLandingPageButton()}
          </div>
        </div>
      </v-parallax>
      <div class="information-page">
        This is a test to try this websites parallax effect! Scroll down and try it please!
      </div>
    </div>
  );
}

export default HomeView;
