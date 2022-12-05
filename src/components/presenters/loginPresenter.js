import resolvePromise from "../../data/network/resolvePromise.js";
import LoginView from "../views/loginView";
import { observeAuthState, signInUser, signOutUser, signUpUser } from "../../data/persistence/firebaseAuth";
import { updateUserData } from "../../data/persistence/firebaseModel";

const Login = {
  props: ["model"],

  data() {
    return {
        authPromiseState: {},
        currentUser: undefined
    };
  },

  created() {
    function signedInACB(user) {
      console.log(user);

      this.currentUser = user;

      // TODO: only if first time?
      updateUserData(user);

      // TODO: load data firebase -> model
    }

    function signedOutACB() {
      this.currentUser = null;

      // TODO: empty model? unsubscribe from firebases changes?
    }

    // this observes any changes to "signed in / signed out" state
    observeAuthState(signedInACB, signedOutACB);
  },

  render() {
    function authResultACB() {
      console.log("promise state:");
      console.log(this.authPromiseState);

      // we probably dont need to do anything here
    }

    function signUpACB(email, password) {
      resolvePromise(signUpUser(email, password), this.authPromiseState, authResultACB);
    }

    function signInACB(email, password) {
      resolvePromise(signInUser(email, password), this.authPromiseState, authResultACB);
    }

    function signOutACB() {
      signOutUser();
    }

    return (
      <LoginView
        currentUser={this.currentUser}
        onSignUp={signUpACB}
        onSignIn={signInACB}
        onSignOut={signOutACB} />
    );
  }
}

export default Login;
