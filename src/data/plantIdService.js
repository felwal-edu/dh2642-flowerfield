import { PLANTID_KEY } from "./plantIdSecrets";

const BASE_URL = "https://plant.id/api/v2/identify";

export function getPlantByImage(base64ImageStr) {
  // TODO:
  // Firefox: Cross-Origin Request Blocked: The Same Origin Policy disallows reading the remote resource
  // Edge: Failed to load resource: net::ERR_CONNECTION_CLOSED

  return callAPI("?" + new URLSearchParams({images: [base64ImageStr]}));
}

function callAPI(params) {
  return fetch(BASE_URL + params, {
    "method": "POST",
    "headers": {
      "Content-Type": "application/json",
      "Api-Key": PLANTID_KEY,
    }
  }).then(treatHTTPResponseACB);
}

export function treatHTTPResponseACB(response) {
  if (response.ok) {
    return response.json();
  }

  throw new Error("API problem: " + response.status);
}
