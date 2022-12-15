import background from "@/assets/signupbackground.jpg";

function SignUpView(props) {


    function signUpClickACB(evt) {
        if (props.currentUser !== null || props.currentUser === undefined) {
            console.log("already signed up");

        }

        props.onSignUp();
    }

    function emailInputChangeACB(evt) {
        console.log(evt.target.value);
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
                    <v-card class="mx-auto mt-12" elevation="4" width="35%" color="#000efe" justify="center">
                        <v-col align-self="start" class="justify-center align-center pa-0" cols="12">
                            <v-row justify="center">
                                <v-card-title class="mt-12">
                                    <h1 class="header-font-signup">Create an account:</h1>
                                </v-card-title>
                            </v-row>
                            <v-row justify="center"><v-col sm="8"><v-text-field clearable onChange={emailInputChangeACB}>Email: </v-text-field></v-col></v-row>
                            <v-row justify="center"><v-col sm="8"><v-text-field type="password" clearable onChange={passwordInputChangeACB}>Password: </v-text-field></v-col></v-row>
                            <v-row justify="center"><v-col sm="8"><v-text-field type="password" clearable onChange={passwordCheckInputChangeACB}>Confirm password: </v-text-field></v-col></v-row>
                            <v-row justify="center" class="mx-8"><v-btn onClick={signUpClickACB}>Sign up</v-btn></v-row>
                            <v-row justify="center" class="my-4 mb-12">
                                <p class="link-text">Already have an account? <span onClick={goToLoginACB}>Login</span></p>
                            </v-row>
                        </v-col>
                    </v-card>
                    <v-snackbar v-model={props.snackbar} class="d-flex" color="#0d0963">
                        {"Passwords don't match"}
                    </v-snackbar>
                </v-parallax>
            </v-app>


        </div >
    )
}



export default SignUpView;
