import background from "@/assets/loginbackground.jpg";

function LoginView(props) {

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


  function goToSignUpACB() {
    props.onGoToSignUp();
  }

  return (
    <div>

      <v-app class="ma-8 mt-12" align="center" justify="center">
        <v-parallax
          height="10vh"
          src={background}>
          <v-card class="mx-auto mt-12" elevation="4" width="35%" color="#33db69" justify="center">
            <v-col align-self="start" class="justify-center align-center pa-0" cols="12">
              <v-row justify="center">
                <v-card-title class="mt-12">
                  <h1 class="header-font">
                    Welcome back to Flowerfield
                  </h1>
                </v-card-title>
              </v-row>
              <v-row justify="center">
                <v-col sm="8">
                  <v-text-field clearable onChange={emailInputChangeACB}>Email: </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col sm="8">
                  <v-text-field hint="Must be 6 characters long" clearable onChange={passwordInputChangeACB}>Password: </v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" class="my-4">
                <v-btn onClick={signInClickACB}>Sign in</v-btn>
              </v-row>
              <v-row justify="center" class="my-4 mb-12">
                <p class="link-text">Don't have an account? <span onClick={goToSignUpACB}>Sign up</span></p>
              </v-row>
            </v-col>
          </v-card>
          <v-snackbar v-model={props.snackbar} class="d-flex" color="#0d0963">
            {props.errorMessage}
            <v-btn color="#a02a3d" variant="text" class="ml-12" onClick={closeErrorSnackbarACB}>Close</v-btn>
          </v-snackbar>
        </v-parallax>
      </v-app>

    </div >

  );
}

export default LoginView;
