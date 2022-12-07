function LoginView(props) {
  function signUpClickACB(evt) {
    if (props.currentUser !== null || props.currentUser === undefined) {
      console.log("already signed up");
      return;
    }

    props.onSignUp();
  }

  function signInClickACB(evt) {
    if (props.currentUser !== null || props.currentUser === undefined) {
      console.log("already signed in");
      return;
    }

    props.onSignIn();
  }

  function emailInputChangeACB(evt) {
    console.log(evt.target.value);
    props.onEmailChange(evt.target.value);
  }

  function passwordInputChangeACB(evt) {
    props.onPasswordChange(evt.target.value);
  }

  function closeErrorSnackbarACB() {
    props.onCloseErrorSnackbar();
  }

  return (
    <div>
      <v-app class="ma-8" align="center">
        <v-card class="mx-auto" elevation="2" width="100%" color="#b0d2cf">
          <v-col align-self="start" class="justify-center align-center pa-0" cols="12">
            <v-row class="ml-10"><v-card-title class="ma-4 ml-6">Login/SignUp</v-card-title></v-row>
            <v-row justify="center"><v-col sm="11"><v-text-field clearable onChange={emailInputChangeACB}>Email: </v-text-field></v-col></v-row>
            <v-row justify="center"><v-col sm="11"><v-text-field hint="Must be 6 characters long" clearable onChange={passwordInputChangeACB}>Password: </v-text-field></v-col></v-row>
            <v-row justify="center" class="mt-4"><v-btn onClick={signInClickACB}>Sign in</v-btn></v-row>
            <v-row justify="center" class="my-4"><v-btn onClick={signUpClickACB}>Sign up</v-btn></v-row>

          </v-col>
        </v-card>
        <v-snackbar v-model={props.snackbar} class="d-flex" color="#0d0963">
          {props.errorMessage}
          <v-btn color="#a02a3d" variant="text" class="ml-12" onClick={closeErrorSnackbarACB}>
            Close
          </v-btn>
        </v-snackbar>

      </v-app>
    </div >
  );
}

export default LoginView;
