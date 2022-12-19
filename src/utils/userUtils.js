export function waitingForUserToBeSignedIn(userStatus, router) {
  if (userStatus === undefined) {
    // wait for Firebase
    return true;
  }
  else if (userStatus === null) {
    // this page is only available in logged-in state
    router.push({name: "login"});
    return true;
  }
}

export function waitingForUserToBeSignedOut(userStatus, router) {
  if (userStatus === undefined) {
    // wait for Firebase
    return true;
  }
  else if (userStatus !== null) {
    // this page is only available in logged-out state
    router.push({name: "profile"});
    return true;
  }
}


export function InvalidInfoMessage(fireBaseMessage) {
  if (fireBaseMessage === "Firebase: Error (auth/invalid-email).") {
    return "Email is in wrong format. Please double check email, or sign up.";
  }
  else if (fireBaseMessage === "Firebase: Error (auth/wrong-password).") {
    return "Wrong password. Please try again.";
  }
  else if (fireBaseMessage === "Firebase: Error (auth/missing-email).") {
    return "Please fill out all fields.";
  }
  else if (fireBaseMessage === "Firebase: Error (auth/user-not-found).") {
    return "Account does not exist. Please double check email.";
  }
  else if (fireBaseMessage === "Firebase: Error (auth/email-already-in-use).") {
    return "Account already exists.";
  }
  else if (fireBaseMessage === "Firebase: Error (auth/internal-error).") {
    return "Authentication error. Please double check all fields.";
  }
  else if (fireBaseMessage === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
    return "Password must be at least 6 characters.";
  }
  else {
    return fireBaseMessage;
  }
}
