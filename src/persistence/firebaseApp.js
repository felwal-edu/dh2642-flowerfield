import log from "@/utils/logUtils";
import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseSecrets";

log.i("initializing Firebase ...")

// this can't be in `firebaseModel.js` since that causes
// a circular dependency between that and `firebaseAuth.js`.
const app = initializeApp(firebaseConfig);

export default app;
