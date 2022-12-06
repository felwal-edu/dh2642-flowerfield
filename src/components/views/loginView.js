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

  return (
    <div>
      <v-app class="ma-8">
        <v-card elevation="2" width="80%" color="green">
          <v-col class="ma-8">
            <v-row><v-card-text>Login/SignUp</v-card-text></v-row>
            <v-row><v-text-field onChange={emailInputChangeACB}>Email: </v-text-field></v-row>
            <v-row><v-text-field onChange={passwordInputChangeACB}>Password: </v-text-field></v-row>
            <v-row class="mt-4"><v-btn onClick={signInClickACB}>Sign in</v-btn></v-row>
            <v-row class="mt-4"><v-btn onClick={signUpClickACB}>Sign up</v-btn></v-row>
          </v-col>
        </v-card>
      </v-app>
    </div>
  );
}

export default LoginView;
