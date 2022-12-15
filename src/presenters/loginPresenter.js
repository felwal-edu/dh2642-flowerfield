import resolvePromise from "../utils/resolvePromise.js";
import LoginView from "../views/loginView";
import useFlowerStore from "@/store/flowerStore.js";
import { signInUser, signUpUser } from "@/persistence/firebaseAuth.js";
import { watch } from "vue";
import { waitingForUserToBeSignedOut } from "@/utils/userUtils.js";

const LoginPresenter = {
  data() {
    return {
      userStatus: undefined,
      authPromiseState: {},
      email: "",
      password: "",
      snackbar: false,
      errorMessage: ""
    };
  },

  created() {
    this.userStatus = useFlowerStore().currentUser;

    // watch user status
    watch(() => useFlowerStore().currentUser, function (newUser) {
      this.userStatus = newUser;
    }.bind(this));
  },

  render() {
    if (waitingForUserToBeSignedOut(this.userStatus, this.$router)) return;

    function authResultACB() {
      if (this.authPromiseState.error) {
        console.error(this.authPromiseState.error.message);
        this.errorMessage = this.authPromiseState.error.message;
        this.snackbar = true;
      }
      // return to home if login was successful!
      else if (this.authPromiseState.data !== null) {
        console.log("logged in!");
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
