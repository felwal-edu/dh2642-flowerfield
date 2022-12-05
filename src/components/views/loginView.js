function LoginView(props) {
  function signUpClickACB(evt) {
    if (props.currentUser !== null || props.currentUser === undefined) {
      console.log("already signed up");
      return;
    }

    props.onSignUp("***REMOVED***", "***REMOVED***");
  }

  function signInClickACB(evt) {
    if (props.currentUser !== null || props.currentUser === undefined) {
      console.log("already signed in");
      return;
    }

    props.onSignIn("***REMOVED***", "***REMOVED***");
  }

  function signOutClickACB(evt) {
    if (!props.currentUser) {
      console.log("already signed out");
      return;
    }

    props.onSignOut();
  }

  return (
    <div>
      <button onClick={signUpClickACB}>Sign up</button>
      <button onClick={signInClickACB}>Sign in</button>
      <button onClick={signOutClickACB}>Sign out</button>
    </div>
  );
}

export default LoginView;
