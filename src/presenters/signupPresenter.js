import resolvePromise from "../utils/resolvePromise.js";
import useFlowerStore from "@/store/flowerStore";
import { signUpUser } from "@/persistence/firebaseAuth.js";
import SignUpView from "@/views/signupView.js";
import { watch } from "vue";
import { waitingForUserToBeSignedOut } from "@/utils/userUtils.js";


const SignUpPresenter = {
    data() {
        return {
            userStatus: undefined,
            authPromiseState: {},
            email: "",
            password: "",
            passwordCheck: "",
            errorMessage: "",
            snackbar: false
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
        function signUpACB() {
            if (this.password !== this.passwordCheck) {

                this.snackbar = true
                console.log(this.passwordCheck)
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




        return (
            <SignUpView
                currentUser={useFlowerStore().currentUser}
                onEmailChange={emailChangeACB.bind(this)}
                onPasswordChange={passwordChangeACB.bind(this)}
                onPasswordCheckChange={checkPasswordChangeACB.bind(this)}
                onSignUp={signUpACB.bind(this)}
                snackbar={this.snackbar} />
        );

    }

};



export default SignUpPresenter;

