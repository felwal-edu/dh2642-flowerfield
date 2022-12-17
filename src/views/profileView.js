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

  function deleteAccountClickACB(evt) {
    props.onDeleteAccount();
  }

  function changeUsernameACB(evt) {
    if (evt.key === 'Enter') {
      let newName = document.getElementById("username-inputfield").value;
      props.onChangeUsername(newName);
    }
  }

  return (
    <div>
      <v-card shaped class="mx-auto mt-16 profile-background" max-width="900" height="450">
        <v-img src={profileBackground}>
          <v-card-title class="header-font-profile mt-14">My Profile</v-card-title>
          <v-row>

            <v-col justify="center" class="profilecard-margin-left mt-8" cols="4">
              <v-row justify="center">
                <v-col cols="3" class="mt-4">
                  <h4 class="header-description">email</h4>
                </v-col>
                <v-col>
                  <v-card-title>
                    <h4 class="user-info">{props.currentUser?.email || "Not logged in!"}</h4>
                  </v-card-title>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col cols="4" class="mt-5">
                  <h4 class="header-description">username</h4>
                </v-col>
                <v-col>
                  <v-text-field id="username-inputfield" label="" placeholder="Enter a username" variant="underlined"
                    density="compact" model-value={props.userName} hint="Press 'enter' to confirm."
                    onKeydown={changeUsernameACB}
                  />
                </v-col>
              </v-row>
              <v-row class="my-5 mx-8" justify="left">
                <v-btn variant="outlined" onClick={signOutClickACB}>Sign out</v-btn>
              </v-row>
            </v-col>

            <v-col justify="center" class="profilecard-margin-right mt-8" cols="5">
              <v-row justify="center" class="mt-2 mb-n6">
                <span class="header-description mb-4" justify="center">current rank</span>
              </v-row>
              <v-row justify="center">
                <v-card-title>
                  <h4 class="user-info rank">{props.currentRank}</h4>
                </v-card-title>
              </v-row>
              <v-row justify="center">
                <v-card-title class="my-n2">
                  <span class="header-description">progress to next rank</span>
                </v-card-title>
                <v-progress-linear
                  class="mx-8"
                  model-value={props.experienceBar}
                  color="light-green-darken-3"
                  height="9"
                  striped
                  elevation="2"
                />
                <v-row class="mt-6 ml-5">
                  <v-col>
                    <v-btn
                      onClick={deleteAccountClickACB}
                      icon="mdi-delete"
                      color="red"
                    />
                  </v-col>
                </v-row>
              </v-row>
            </v-col>
          </v-row>
        </v-img>
      </v-card>

    </div>
  )

}

export default ProfileView;
