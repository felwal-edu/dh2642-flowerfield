import background from "@/assets/signupbackground.png";
import log from "@/utils/logUtils";

function SignUpView(props) {


    function signUpClickACB(evt) {
        if (!props.currentUser) {
            log.w("already signed up");

        }

        props.onSignUp();
    }

    function userNameInputChangeACB(evt) {
        props.onUserNameChange(evt.target.value);
    }

    function emailInputChangeACB(evt) {
        log.d("email input target", evt.target.value);
        props.onEmailChange(evt.target.value);
    }

    function passwordInputChangeACB(evt) {
        props.onPasswordChange(evt.target.value);
    }

    function passwordCheckInputChangeACB(evt) {
        props.onPasswordCheckChange(evt.target.value);
    }

    function goToLoginACB() {
        props.onGoToLogin();

    }
    return (

        <div>

            <v-app class="ma-8" align="center">
                <v-parallax
                    height="10vh"
                    src={background}>
                    <v-card class="mx-auto mt-12 signup-background" elevation="4" justify="center">
                        <v-col align-self="start" class="justify-center align-center pa-0" cols="12">
                            <v-row justify="center">
                                <v-card-title class="mt-12">
                                    <h1 class="header-font-signup">Create an account</h1>
                                </v-card-title>
                            </v-row>

                            <v-row justify="center">
                                <v-col sm="8">
                                    <v-text-field class="input-text" clearable onChange={userNameInputChangeACB} label="Name" placeholder="John Doe"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center">
                                <v-col sm="8">
                                    <v-text-field class="input-text" clearable onChange={emailInputChangeACB} label="Email" placeholder="example@mail.com"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center">
                                <v-col sm="8">
                                    <v-text-field class="input-text" type="password" clearable onChange={passwordInputChangeACB} label="Password"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center">
                                <v-col sm="8">
                                    <v-text-field class="input-text" type="password" clearable onChange={passwordCheckInputChangeACB} label="Confirm Password"></v-text-field>
                                </v-col>
                            </v-row>

                            <v-row justify="center" class="my-4">
                                {
                                  props.isWaitingForAuth
                                    // TODO: använd promiseNoData?
                                    ? <v-progress-circular indeterminate="true" color="white" class="mt-1" />
                                    : <v-btn onClick={signUpClickACB}>Sign up</v-btn>
                                }
                            </v-row>

                            <v-row justify="center" class="my-4 mb-12">
                                <p class="link-text-signup">Already have an account? <span onClick={goToLoginACB}>Login</span></p>
                            </v-row>
                        </v-col>
                    </v-card>
                    <v-snackbar model-value={props.snackbar} class="d-flex" color="#0d0963">
                        {props.errorMessage}
                    </v-snackbar>
                </v-parallax>
            </v-app>


        </div >
    )
}



export default SignUpView;
