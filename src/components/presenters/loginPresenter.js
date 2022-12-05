import resolvePromise from "../../data/network/resolvePromise.js";
import LoginView from "../views/loginView";
import { signInUser, signOutUser, signUpUser } from "../../data/persistence/firebaseAuth";
import { UserInfoStore } from "@/data/flowerStore.js";

const Login = {
  props: ["model"],

  data() {
    return {
        authPromiseState: {}
    };
  },

  render() {
    function authResultACB() {
      if (this.authPromiseState.error) {
        console.error(this.authPromiseState.error.message);
      }

      // we probably dont need to do anything here
    }

    function signUpACB(email, password) {
      resolvePromise(signUpUser(email, password), this.authPromiseState, authResultACB.bind(this));
    }

    function signInACB(email, password) {
      resolvePromise(signInUser(email, password), this.authPromiseState, authResultACB.bind(this));
    }

    function signOutACB() {
      signOutUser();
    }

    return (
      <LoginView
        currentUser={UserInfoStore().currentUser}
        onSignUp={signUpACB.bind(this)}
        onSignIn={signInACB.bind(this)}
        onSignOut={signOutACB} />
    );
  }
}

export default Login;
