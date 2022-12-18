import background from "@/assets/loginbackground.jpg";
import log from "@/utils/logUtils";
import LoadingView from "./loadingView";

function LoginView(props) {

  function signInClickACB(evt) {
    if (props.currentUser) {
      log.w("already signed in");
      return;
    }

    props.onSignIn();
  }


  function emailInputChangeACB(evt) {
    log.d("email input target:", evt.target.value);
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
          <v-card class="mx-auto mt-12 login-background" elevation="4" justify="center">
            <v-col align-self="start" class="justify-center align-center pa-0" cols="12">
              <v-row justify="center">
                <v-card-title class="mt-12">
                  <h1 class="header-font-login">
                    Welcome back to Flowerfield
                  </h1>
                </v-card-title>
              </v-row>
              <v-row justify="center">
                <v-col sm="8">
                  <v-text-field clearable onChange={emailInputChangeACB} label="Email" placeholder="example@mail.com"></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col sm="8">
                  <v-text-field hint="Must be 6 characters long" type="password" clearable onChange={passwordInputChangeACB} label="Password"></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="center" class="my-4">
                {
                  props.isWaitingForAuth
                    // TODO: använd promiseNoData?
                    ? <v-progress-circular indeterminate="true" color="white" class="mt-1" />
                    : <v-btn onClick={signInClickACB}>Sign in</v-btn>
                }
              </v-row>
              <v-row justify="center" class="my-4 mb-12">
                <p class="link-text">Don't have an account? <span onClick={goToSignUpACB}>Sign up</span></p>
              </v-row>
            </v-col>
          </v-card>
          <v-snackbar model-value={props.snackbar} class="d-flex" color="#0d0963" timeout="-1">
            {props.errorMessage}
          </v-snackbar>
        </v-parallax>
      </v-app>
    </div >
  );
}

export default LoginView;
