function LoginView(props) {
  function signUpClickACB(evt) {
    if (props.currentUser !== null || props.currentUser === undefined) {
      console.log("already signed up");
      return;
    }

    props.onSignUp();
  }

  function signInClickACB(evt) {
    if (props.currentUser !== null || props.currentUser === undefined) {
      console.log("already signed in");
      return;
    }

    props.onSignIn();
  }

  function emailInputChangeACB(evt) {
    props.onEmailChange(evt.target.value);
  }

  function passwordInputChangeACB(evt) {
    props.onPasswordChange(evt.target.value);
  }

  return (
    <div>
      Email:
      <input onChange={emailInputChangeACB} value=""></input>
      Password:
      <input onChange={passwordInputChangeACB} value=""></input>
      <button onClick={signUpClickACB}>Sign up</button>
      <button onClick={signInClickACB}>Sign in</button>
    </div>
  );
}

export default LoginView;
