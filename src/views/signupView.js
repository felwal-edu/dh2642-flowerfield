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
                <v-card class="mx-auto" elevation="2" width="100%" color="#b0d2cf">
                    <v-col>
                        <v-row justify="center"><v-title>Create account: </v-title></v-row>
                        <v-row justify="center"><v-col sm="11"><v-text-field clearable onChange={emailInputChangeACB}>Email: </v-text-field></v-col></v-row>
                        <v-row justify="center"><v-col sm="11"><v-text-field type="password" clearable onChange={passwordInputChangeACB}>Password: </v-text-field></v-col></v-row>
                        <v-row justify="center"><v-col sm="11"><v-text-field type="password" clearable onChange={passwordCheckInputChangeACB}>Confirm password: </v-text-field></v-col></v-row>
                        <v-row justify="center" class="mx-8"><v-btn onClick={signUpClickACB}>Sign up</v-btn></v-row>
                        <v-row justify="center" class="ma-8"><v-btn onClick={goToLoginACB}>Already have an account? </v-btn></v-row>
                    </v-col>
                </v-card>
                <v-snackbar v-model={props.snackbar} class="d-flex" color="#0d0963">
                    {"Passwords don't match"}
                </v-snackbar>
            </v-app>

        </div>
    )
}



export default SignUpView;
