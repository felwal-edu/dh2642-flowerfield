function LoginView(props) {
  function signUpClickACB(evt) {
    if (currentUser !== null || currentUser === undefined) return;

    props.onSignUp("***REMOVED***", "***REMOVED***");
  }

  function signInClickACB(evt) {
    if (currentUser !== null || currentUser === undefined) return;

    props.onSignIn("***REMOVED***", "***REMOVED***");
  }

  function signOutClickACB(evt) {
    if (!currentUser) return;

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
