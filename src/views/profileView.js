import "../plugins/vuetify";
//import profileBackground from "@/assets/flower_profile_placeholder.png";
import profileBackground from "@/assets/profile-card.png";
import log from "@/utils/logUtils";

function ProfileView(props) {
  function signOutClickACB(evt) {
    if (!props.currentUser) {
      log.w("already signed out");
      return;
    }
    props.onSignOut();
  }

  function changeUsernameACB(evt) {
    let newName = document.getElementById("username-inputfield").value;
    props.onChangeUsername(evt, newName);
  }

  return (
    <div>
      <v-card shaped class="mx-auto mt-16 profile-background" max-width="700" height="360">
        <v-img src={profileBackground}>
          <v-card-title class="header-font-profile mt-12">My Profile</v-card-title>
          <v-row>
            <v-col class="ml-8">
              <v-row class="mt-2" justify="center">
                <v-card-title><h4 class="user-info">{props.currentUser?.email || "Not logged in!"}</h4></v-card-title>
              </v-row>
              <v-row justify="center">
                <v-col
                  sm="10"
                  md="8"
                >
                  <v-text-field id="username-inputfield" label="" placeholder="Enter a username" variant="underlined"
                  density="compact" model-value={props.userName} hint="Press 'enter' to confirm."
                  onKeydown={changeUsernameACB}>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row class="my-5" justify="center">
                <v-btn variant="outlined" onClick={signOutClickACB}>Sign out</v-btn>
              </v-row>
            </v-col>
            <v-col justify="center" class="profilecard-marginleft" cols="4">
              <v-row justify="center" class="mt-2 mb-n6">
                <span class="header-description" justify="center">Current rank</span>
              </v-row>
              <v-row justify="center" class="">
                <v-card-title>
                  <h4 class="user-info rank">{props.currentRank}</h4>
                </v-card-title>
              </v-row>
              <v-row justify="center">
                <v-card-title class="my-n2">
                  <span class="header-description">progress to next rank</span>
                </v-card-title>
                <v-progress-linear
                  model-value="100"
                  color="light-green-darken-3"
                  height="8"
                  striped
                  elevation="2"
                ></v-progress-linear>
              </v-row>
            </v-col>
          </v-row>
        </v-img>
      </v-card>

      <v-btn
          icon="mdi-delete"
          color="success"
        ></v-btn>
    </div>
  )

}

export default ProfileView;
