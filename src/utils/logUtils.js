const DEBUG = true;

const log = {
  // info
  i(message, ...optionalParams) {
    typeLog("I", message, optionalParams)
  },

  // debug
  d(message, ...optionalParams) {
    typeLog("D", message, optionalParams)
  },

  // warning
  w(message, ...optionalParams) {
    typeLog("W", message, optionalParams)
  },

  // error
  e(message, ...optionalParams) {
    typeLog("E", message, optionalParams)
  }
}

function typeLog(type, message, optionalParams) {
  // we want a clean console when not developing
  if (!DEBUG) return;

  if (optionalParams.length !== 0) {
    console.log(type + ": " + message, optionalParams);
  }
  else {
    console.log(type + ": " + message);
  }
}

export default log;
