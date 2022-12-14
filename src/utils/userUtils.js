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
    // this page is only available in logged-in state
    router.push({name: "profile"});
    return true;
  }
}
