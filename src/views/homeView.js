import logopath from "@/assets/logo_test.png";
import background from "@/assets/home_parallax.jpg";
import home_flower from "@/assets/home_flower_background.png";
import home_photo from "@/assets/home_photo.png";
import home_growth from "@/assets/home_growth.png";
import home_camera from "@/assets/home_camera.png";
import "@/css/home.css"

function HomeView(props) {
  function renderLandingPageButton() {
    if (props.userStatus === undefined || props.userStatus === null) {
      return (
        <router-link to="/signup">
          <v-btn /*color="#a02a3d"*/ variant="tonal">Get Started!</v-btn>
        </router-link>
      );
    }
    else {
      return (
        <router-link to="/upload">
          <v-btn /*color="#a02a3d"*/ variant="tonal">Upload Flower!</v-btn>
        </router-link>
      );
    }
  }

  return (
    <div>
      <v-parallax height="600" src={background}>
        <div class="d-flex flex-column fill-height justify-center align-center text-white">
          <div class="landing-page center">
            <img class="logo" src={logopath} />
            <p class="subheader">Flowers worth Remembering</p>
            {renderLandingPageButton()}
          </div>
        </div>
      </v-parallax>
      <div class="information-page">
        <v-container justify="center">
          <v-col align-self="start" class="justify-center align-center pa-0" cols="12">
            <v-row justify="center" align="center" class="mt-14">
              <h1> A relaxing experience. </h1>
            </v-row>
            <v-row justify="center" align="center">
              <img class="home-photo" src={home_photo} alt="Logo" />
              <p>Take pictures of flowers and plants - Flowerfield can automatically identify them, <br></br>
                providing you with new information about your surroundings.</p>
            </v-row>
          </v-col>
        </v-container>
        <v-container justify="center" class="mt-14">
          <v-parallax height="500" src={home_flower}>
            <v-col align-self="start" class="justify-center align-center pa-0" cols="12">
              <v-row justify="center" align="center" class="mt-14">
                <h1> A digital assortment. </h1>
              </v-row>
              <v-row justify="center" align="center" class="mt-14 pt-14">
                <p class="highlighted">Store your discoveries in a digital collection, hosted on Flowerfield. <br></br>
                  View your progress and collect sets of flowers and plants.</p>
              </v-row>
            </v-col>
          </v-parallax>
        </v-container>
        <v-container justify="center">
          <v-col align-self="start" class="justify-center align-center pa-0" cols="12">
            <v-row justify="center" class="mt-14">
              <h1> A journey of <span>growth.</span> </h1>
            </v-row>
            <v-row justify="center" align="center" class="mt-4">
              <img class="home-plant" src={home_growth} alt="Logo" />
              <p class="mt-10">As your collection grows, so do you! <br></br>
                Gain experience from collecting flowers, and grow your botanical expertise.</p>
            </v-row>
          </v-col>
        </v-container>
        <v-container class="information-end">
          <v-col align-self="start" class="justify-center align-center pa-0" cols="12">
            <v-row justify="center" class="mt-14">
              <img class="home-camera" src={home_camera} alt="Logo" />
            </v-row>
            <v-row justify="center" class="mt-8 mb-8">
              <h1> Capture the moment! </h1>
            </v-row>
            <v-row justify="center" class="mb-14">
              <p>Start using Flowerfield today for free</p>
            </v-row>
          </v-col>
        </v-container>
      </div>
    </div>
  );
}

export default HomeView;
