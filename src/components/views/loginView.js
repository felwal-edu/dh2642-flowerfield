function LoginView(props) {
  function signUpClickACB(evt) {
    console.log(props);
    if (props.currentUser !== null || props.currentUser === undefined) return;

    props.onSignUp("nils.felix@gmail.com", "Hejhej1");
  }

  function signInClickACB(evt) {
    if (props.currentUser !== null || props.currentUser === undefined) return;

    props.onSignIn("nils.felix@gmail.com", "Hejhej1");
  }

  function signOutClickACB(evt) {
    if (!props.currentUser) return;

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
