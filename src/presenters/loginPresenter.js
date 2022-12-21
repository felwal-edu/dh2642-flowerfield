import resolvePromise from "../utils/resolvePromise.js";
import LoginView from "../views/loginView";
import useFlowerStore from "@/store/flowerStore.js";
import { signInUser } from "@/persistence/firebaseAuth.js";
import { waitingForUserToBeSignedOut } from "@/utils/userUtils.js";
import "../css/login.css"
import log from "@/utils/logUtils.js";
import { mapState } from "pinia";
import { InvalidInfoMessage } from "@/utils/userUtils.js";
import LoadingView from "@/views/loadingView.js";
import { isPromiseLoading } from "@/utils/loadingUtils.js";

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
    if (waitingForUserToBeSignedOut(this.userStatus, this.$router)) return <LoadingView />;

    function authResultACB() {
      if (this.authPromiseState.error) {
        log.e(this.authPromiseState.error.message);

        this.errorMessage = InvalidInfoMessage(this.authPromiseState.error.message);
        this.snackbar = true;
      }
      else if (this.authPromiseState.data !== null) {
        // return to home if login was successful
        this.$router.push({name: "home"});
      }
    }

    function signInACB() {
      this.snackbar = false;
      resolvePromise(signInUser(this.email, this.password), this.authPromiseState, authResultACB.bind(this));
    }

    function setEmailACB(email) {
      this.email = email;
    }

    function setPasswordACB(password) {
      this.password = password;
    }

    function goToSignUpACB() {
      this.$router.push({name: "signup"})
    }

    return (
      <LoginView
        currentUser={useFlowerStore().currentUser}
        onEmailChange={setEmailACB.bind(this)}
        onPasswordChange={setPasswordACB.bind(this)}
        onSignIn={signInACB.bind(this)}
        isWaitingForAuth={isPromiseLoading(this.authPromiseState)}
        snackbar={this.snackbar}
        errorMessage={this.errorMessage}
        onGoToSignUp={goToSignUpACB.bind(this)} />
    );
  }
};

export default LoginPresenter;
