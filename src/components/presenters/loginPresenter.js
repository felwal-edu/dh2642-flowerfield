import resolvePromise from "../../data/network/resolvePromise.js";
import LoginView from "../views/loginView";
import { signInUser, signOutUser, signUpUser } from "../../data/persistence/firebaseAuth";
import useFlowerStore  from "@/data/flowerStore.js";

const LoginPresenter = {
  data() {
    return {
        authPromiseState: {},
        email: "",
        password: ""
    };
  },

  render() {
    function authResultACB() {
      if (this.authPromiseState.error) {
        console.error(this.authPromiseState.error.message);
      }

      // we probably dont need to do anything here
    }

    function signUpACB() {
      resolvePromise(signUpUser(this.email, this.password), this.authPromiseState, authResultACB.bind(this));
    }

    function signInACB() {
      resolvePromise(signInUser(this.email, this.password), this.authPromiseState, authResultACB.bind(this));
    }

    function emailChangeACB(email) {
      this.email = email;
    }

    function passwordChangeACB(password) {
      this.password = password;
    }

    return (
      <LoginView
        currentUser={useFlowerStore().currentUser}
        onEmailChange={emailChangeACB.bind(this)}
        onPasswordChange={passwordChangeACB.bind(this)}
        onSignUp={signUpACB.bind(this)}
        onSignIn={signInACB.bind(this)} />
    );
  }
}

export default LoginPresenter;
