import resolvePromise from "../network/resolvePromise";
import LoginView from "../views/loginView";
import { observeAuthState, signInUser, signOutUser, signUpUser } from "./firebaseAuth";
import { createUser } from "./firebaseModel";

const LoginPresenter = {
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

      // TODO: create firebase entry if first time
      createUser(user);

      // TODO: load data firebase -> model
    }

    function signedOutACB() {
      this.currentUser = null;

      // TODO: empty model
    }

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
        onSignUp={signUpACB}
        onSignIn={signInACB}
        onSignOut={signOutACB} />
    );
  }
}

export default LoginPresenter;
