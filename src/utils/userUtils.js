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


export function InvalidLoginInfoMessage(fireBaseMessage) {
  if (fireBaseMessage === "Firebase: Error (auth/invalid-email).") {
    return "This email doesn't exist, doublecheck your input."
  }
  else if (fireBaseMessage === "Firebase: Error (auth/wrong-password).") {
    return "Wrong password, please try again."

  }
  else {
    return fireBaseMessage
  }

}
