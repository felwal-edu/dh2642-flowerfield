export default function LoadingView(props) {
  return (
    <div class={"optical-center"}>
      {
        props.linear
          ? <v-progress-linear indeterminate="true" color="light-green-darken-3" />
          : <v-progress-circular indeterminate="true" color="light-green-darken-3" />
      }
    </div>
  );
}
