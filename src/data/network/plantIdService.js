import { PLANTID_KEY } from "./plantIdSecrets";

const BASE_URL = "https://api.plant.id/v2/identify";

export function getPlantByImage(base64ImageStr) {
  return callAPI({
    api_key: PLANTID_KEY,
    images: [base64ImageStr]
  });
}

function callAPI(data) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  }).then(treatHTTPResponseACB);
}

export function treatHTTPResponseACB(response) {
  if (response.ok) {
    return response.json();
  }

  throw new Error("API problem: " + response.status);
}
