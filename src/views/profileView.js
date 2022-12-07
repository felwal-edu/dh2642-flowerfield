import "../plugins/vuetify";

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
      <v-card shaped class="rounded-card mx-auto mt-16" max-width="344" height="320">
        <v-card-title>My Profile</v-card-title>
        <v-col align-self="start" class="justify-center align-center pa-0" cols="12">
          <v-row justify="center">
            <v-avatar color="info" class="mb-6 mt-6 mx-auto" size="60">
              <v-icon icon="mdi-account-circle"></v-icon>
            </v-avatar>
          </v-row>
          <v-row justify="center">
            <v-card-title>{props.currentUser?.email || "Not logged in!"}</v-card-title>
          </v-row>
          <v-row justify="center">
            <v-card-title>{"Number of plants collected: " + props.amountPlants}</v-card-title>
          </v-row>
          <v-row justify="center">
            <v-card-title>{"Experience: " + props.userExperience}</v-card-title>
          </v-row>
          <v-row justify="center pt-5">
            <v-card-actions>
              <v-btn variant="outlined" onClick={signOutClickACB}>Sign out</v-btn>
            </v-card-actions>
          </v-row>
        </v-col>
      </v-card>
    </div>
  );
}

export default ProfileView;
