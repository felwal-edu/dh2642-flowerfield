export default function DialogView(props) {
  return (
    <div>
      <v-overlay model-value={true} class="d-flex justify-center align-center">
        <v-row align="center" justify="center">
          <v-card>
            <v-card-title class="justify-center">{props.title}</v-card-title>
            <v-card-subtitle class="justify-center">{props.message}</v-card-subtitle>
            <v-card-actions>
              <v-row class="justify-center align-center">
                {
                  props.buttonPrimaryText
                    ? <v-btn color="primary" variant="tonal" onClick={props.onButtonPrimaryClick}>{props.buttonPrimaryText}</v-btn>
                    : undefined
                }
                {
                  props.buttonSecondaryText
                    ? <v-btn color="primary" onClick={props.onButtonSecondaryClick}>{props.buttonSecondaryText}</v-btn>
                    : undefined
                }
              </v-row>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-overlay>
    </div>
  );
}
