import resolvePromise from "../utils/resolvePromise.js";
import useFlowerStore from "@/store/flowerStore";
import { signUpUser } from "@/persistence/firebaseAuth.js";
import SignUpView from "@/views/signupView.js";
import { waitingForUserToBeSignedOut } from "@/utils/userUtils.js";
import "../css/signup.css"
import log from "@/utils/logUtils.js";
import { mapState } from "pinia";
import { createUserData } from "@/persistence/firebaseModel.js";
import LoadingView from "@/views/loadingView.js";
import { InvalidInfoMessage } from "@/utils/userUtils.js";
import { isPromiseLoading } from "@/utils/loadingUtils.js";


const SignUpPresenter = {
  data() {
    return {
      authPromiseState: {},
      userName: "",
      email: "",
      password: "",
      passwordCheck: "",
      errorMessage: "",
      snackbar: false
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
        createUserData(useFlowerStore().currentUser, this.userName);
        log.i("Firebase account created");

        // return to home if login was successful!
        this.$router.push({name: "home"});
      }
    }

    function signUpACB() {
      if (this.password !== this.passwordCheck) {
        this.snackbar = true;
        this.errorMessage = "Passwords do not match, please double check.";
        log.d(this.passwordCheck);

        return;
      }

      this.snackbar = false;
      resolvePromise(signUpUser(this.email, this.password), this.authPromiseState, authResultACB.bind(this));
    }

    function setEmailACB(email) {
      this.email = email;
    }

    function setPasswordACB(password) {
      this.password = password;
    }

    function setPasswordCheckACB(passwordCheck) {
      this.passwordCheck = passwordCheck;
    }

    function setUserNameACB(userName) {
      this.userName = userName;
    }

    function goToLoginACB() {
      this.$router.push({name: "login"});
    }

    return (
      <SignUpView
        currentUser={useFlowerStore().currentUser}
        onUserNameChange={setUserNameACB.bind(this)}
        onEmailChange={setEmailACB.bind(this)}
        onPasswordChange={setPasswordACB.bind(this)}
        onPasswordCheckChange={setPasswordCheckACB.bind(this)}
        onSignUp={signUpACB.bind(this)}
        isWaitingForAuth={isPromiseLoading(this.authPromiseState)}
        snackbar={this.snackbar}
        onGoToLogin={goToLoginACB.bind(this)}
        errorMessage={this.errorMessage} />
    );
  }
};

export default SignUpPresenter;
