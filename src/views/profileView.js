import "../plugins/vuetify";
//import profileBackground from "@/assets/flower_profile_placeholder.png";
import profileBackground from "@/assets/profile-card.png";

function ProfileView(props) {
  function signOutClickACB(evt) {
    if (!props.currentUser) {
      console.log("already signed out");
      return;
    }

    props.onSignOut();
  }


  return (
    <div>
      <v-card shaped class="mx-auto mt-16 profile-background" max-width="700" height="360">
        <v-img src={profileBackground}>
          <v-card-title class="header-font mt-12">My Profile</v-card-title>
          <v-row>
            <v-col class="background-left ml-8">

              <v-row class="mt-2" justify="center">
                <v-card-title ><h4 class="user-info">placeholder-username</h4></v-card-title>
              </v-row>

              <v-row class="my-5" justify="center">
                <v-card-title><h4 class="user-info">{props.currentUser?.email || "Not logged in!"}</h4></v-card-title>
              </v-row>
              <v-row class="my-10" justify="center">
                <v-btn variant="outlined" onClick={signOutClickACB}>Sign out</v-btn>
              </v-row>
            </v-col>
            <v-col class="mr-12">

              <v-row class="mt-2" justify="center">
                <v-card-title><h4 class="user-info">{"Current rank:" + props.currentRank}</h4></v-card-title>
              </v-row>

              <v-row class="my-5" justify="center">
                <v-card-title><h4 class="user-info">{"Progress until next rank:"}</h4></v-card-title>
                <v-progress-linear
                  model-value="20"
                  color="light-green-darken-4"
                  height="10"
                  striped
                ></v-progress-linear>
                <v-card-title><h4 class="user-info">{"Experience: " + props.userExperience}</h4></v-card-title>
              </v-row>



            </v-col>
          </v-row>
        </v-img>



      </v-card>

    </div>
  )

}

export default ProfileView;
