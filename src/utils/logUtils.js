// we want a clean console when not developing
const DEBUG = true;

const log = {
  // info
  i(message, ...optionalParams) {
    if (!DEBUG) return;

    console.info("I: " + message, ...optionalParams);
  },

  // debug
  d(message, ...optionalParams) {
    if (!DEBUG) return;

    console.log("D: " + message, ...optionalParams);
  },

  // warning
  w(message, ...optionalParams) {
    if (!DEBUG) return;

    console.warn("W: " + message, ...optionalParams);
  },

  // error
  e(message, ...optionalParams) {
    if (!DEBUG) return;

    console.error("E: " + message, ...optionalParams);
  }
}

export default log;
