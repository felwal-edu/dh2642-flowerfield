export function waitingForUserToBeSignedIn(userStatus, router) {
  if (userStatus === undefined) {
    // wait for Firebase
    return true;
  }
  else if (userStatus === null) {
    // this page is only available in logged-in state
    router.push({ name: "login" });
    return true;
  }
}

export function waitingForUserToBeSignedOut(userStatus, router) {
  if (userStatus === undefined) {
    // wait for Firebase
    return true;
  }
  else if (userStatus !== null) {
    // this page is only available in logged-in state
    router.push({ name: "profile" });
    return true;
  }
}


export function InvalidInfoMessage(fireBaseMessage) {
  if (fireBaseMessage === "Firebase: Error (auth/invalid-email).") {
    return "Email is in wrong format, double check email."
  }
  else if (fireBaseMessage === "Firebase: Error (auth/wrong-password).") {
    return "Wrong password, please try again."

  }
  else if (fireBaseMessage === "Firebase: Error (auth/user-not-found).") {
    return "User does not exist, double check email."

  }
  else {
    return fireBaseMessage
  }

}
