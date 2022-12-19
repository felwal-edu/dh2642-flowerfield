export default function LoadingView(props) {
  return (
    <div class={"optical-center"}>
      {
        props.linear
          ? <v-progress-linear indeterminate color="var(--color-green-dark)" />
          : <v-progress-circular indeterminate color="var(--color-green-dark)" />
      }
    </div>
  );
}
