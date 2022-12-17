import resolvePromise from "../utils/resolvePromise.js";
import LoginView from "../views/loginView";
import useFlowerStore from "@/store/flowerStore.js";
import { signInUser } from "@/persistence/firebaseAuth.js";
import { waitingForUserToBeSignedOut } from "@/utils/userUtils.js";
import "../css/login.css"
import log from "@/utils/logUtils.js";
import { mapState } from "pinia";

const LoginPresenter = {
  data() {
    return {
      authPromiseState: {},
      email: "",
      password: "",
      snackbar: false,
      errorMessage: ""
    };
  },

  computed: {
    ...mapState(useFlowerStore, {userStatus: "currentUser"})
  },

  render() {
    if (waitingForUserToBeSignedOut(this.userStatus, this.$router)) return;

    function authResultACB() {
      if (this.authPromiseState.error) {
        log.e(this.authPromiseState.error.message);

        this.errorMessage = this.authPromiseState.error.message;
        this.snackbar = true;
      }
      // return to home if login was successful!
      else if (this.authPromiseState.data !== null) {
        log.i("logged in!");
        this.$router.push({ name: "home" });
      }
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

    function closeErrorSnackbar() {
      this.snackbar = false;
    }


    function toSignUpACB() {
      this.$router.push({ name: "signup" })
    }


    return (
      <LoginView
        currentUser={useFlowerStore().currentUser}
        onEmailChange={emailChangeACB.bind(this)}
        onPasswordChange={passwordChangeACB.bind(this)}
        onSignIn={signInACB.bind(this)}
        onCloseErrorSnackbar={closeErrorSnackbar.bind(this)}
        snackbar={this.snackbar}
        errorMessage={this.errorMessage}
        onGoToSignUp={toSignUpACB.bind(this)} />
    );
  }
};

export default LoginPresenter;
