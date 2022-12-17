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
        ...mapState(useFlowerStore, { userStatus: "currentUser" })
    },

    render() {
        if (waitingForUserToBeSignedOut(this.userStatus, this.$router)) return <LoadingView />;

        function authResultACB() {
            if (this.authPromiseState.error) {
                log.e(this.authPromiseState.error.message);

                this.errorMessage = this.authPromiseState.error.message;
                this.snackbar = true;
            }
            // return to home if login was successful!
            else if (this.authPromiseState.data !== null) {
                log.i("Firebase account created");
                createUserData(useFlowerStore().currentUser, this.userName);
                log.i("logged in!");
                this.$router.push({ name: "home" });

            }
        }

        function signUpACB() {
            if (this.password !== this.passwordCheck) {

                this.snackbar = true
                this.errorMessage = "Passwords do not match, please double check."
                log.d(this.passwordCheck)
                return;
            }
            this.snackbar = false
            resolvePromise(signUpUser(this.email, this.password), this.authPromiseState, authResultACB.bind(this));
        }

        function emailChangeACB(email) {
            this.email = email;
        }

        function passwordChangeACB(password) {
            this.password = password;
        }

        function checkPasswordChangeACB(passwordCheck) {
            this.passwordCheck = passwordCheck;
        }

        function userNameChangeACB(userName) {
            this.userName = userName;
        }

        function tologinACB() {
            this.$router.push({ name: "login" })
        }



        return (
            <SignUpView
                currentUser={useFlowerStore().currentUser}
                onUserNameChange={userNameChangeACB.bind(this)}
                onEmailChange={emailChangeACB.bind(this)}
                onPasswordChange={passwordChangeACB.bind(this)}
                onPasswordCheckChange={checkPasswordChangeACB.bind(this)}
                onSignUp={signUpACB.bind(this)}
                snackbar={this.snackbar}
                onGoToLogin={tologinACB.bind(this)}
                errorMessage={this.errorMessage}

            />
        );

    }

};



export default SignUpPresenter;

