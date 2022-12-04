import resolvePromise from "../network/resolvePromise";
import { observeAuthState, signInUser, signOutUser, signUpUser } from "./firebaseAuth";
import { createUser } from "./firebaseModel";

// TODO: move to loginPresenter

const promiseState = {}

let currentUser = undefined;

//

function signedInACB(user) {
  console.log(user);

  currentUser = user;

  // TODO: create firebase entry if first time
  createUser(user);

  // TODO: load data firebase -> model
}

function signedOutACB() {
  currentUser = null;

  // TODO: empty model
}

function authResultACB() {
  console.log("promise state:");
  console.log(promiseState);

  // we probably dont need to do anything here
}

//

function signUp(email, password) {
  resolvePromise(signUpUser(email, password), promiseState, authResultACB);
}

function signIn(email, password) {
  resolvePromise(signInUser(email, password), promiseState, authResultACB);
}

//

function signUpClickACB(evt) {
  if (currentUser !== null || currentUser === undefined) return;

  signUp("***REMOVED***", "***REMOVED***");
}

function signInClickACB(evt) {
  if (currentUser !== null || currentUser === undefined) return;

  signIn("***REMOVED***", "***REMOVED***");
}

function signOutClickACB(evt) {
  if (!currentUser) return;

  signOutUser();
}

//

observeAuthState(signedInACB, signedOutACB);

//signUpClickACB();
//signInClickACB();
//signOutClickACB();
