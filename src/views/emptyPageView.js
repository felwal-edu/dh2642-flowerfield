function EmptyPageView(props) {
  return (
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-card
            class="d-flex justify-center"
            color="#E4E4E4">

            <v-card-text class="text-center">
              <h2>{props.message}</h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  );
}

export default EmptyPageView;
