import "../css/error.css"

function ErrorView(props) {
  function goToHomeClickACB() {
    props.onGoToHome();
  }

  return (
    <div>
      <v-app align="center">
        <v-card class="error-background" height="100%">
          <v-card class="mt-12 error-card" height="250px" width="600px">
            <v-card-title class="header-font-error mt-6" justify="center">404 error</v-card-title>
            <v-row justify="center">
              <v-col class="mb-10">
                <p class="error-text">Whoops, no flowers here.</p>
              </v-col>
            </v-row>
            <v-row class="mx-12" justify="center">
              <v-btn onClick={goToHomeClickACB}>Go to homepage</v-btn>
            </v-row>
          </v-card>
        </v-card>
      </v-app>
    </div>
  );
}

export default ErrorView;
