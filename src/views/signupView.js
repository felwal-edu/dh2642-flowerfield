function SignUpView(props) {

    function testACB(evt) {
        console.log("obama")
    }
    return (

        <div>
            <v-app class="ma-8" align="center">
                <v-card>
                    <v-col>
                        <v-row justify="center"><v-col sm="11"><v-text-field clearable onChange={testACB}>Email: </v-text-field></v-col></v-row>
                        <v-row justify="center"><v-col sm="11"><v-text-field clearable onChange={testACB}>Password: </v-text-field></v-col></v-row>
                        <v-row justify="center"><v-col sm="11"><v-text-field clearable onChange={testACB}>Confirm password: </v-text-field></v-col></v-row>


                    </v-col>


                </v-card>
            </v-app>

        </div>
    )
}

