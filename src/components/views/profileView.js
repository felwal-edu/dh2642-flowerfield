import "../../plugins/vuetify";

function ProfileView(props) {
  function signOutClickACB(evt) {
    if (!props.currentUser) {
      console.log("already signed out");
      return;
    }

    props.onSignOut();
  }

  return (
    <div>
      <h1>This is a profile page!</h1>
      <h2>{props.currentUser?.email || "Not logged in!"}</h2>
      <button onClick={signOutClickACB}>Sign out</button>
    </div>
  );
}

export default ProfileView;
