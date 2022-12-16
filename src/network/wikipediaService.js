//import { PLANTID_KEY } from "./plantIdSecrets";
const BASE_URL = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=`;

export function getArticleByPlantName(scientificName) {
    let encodedQuery = encodeURIComponent(scientificName)
  return callAPI({

  }, query);
}

function callAPI(data, query) {
  return fetch(BASE_URL + query, {
    method: "GET",
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

// Example program that uses the Wikipedia API to search for an article
/*
const readline = require('readline');
const https = require('https');

// Prompt the user to enter the search query
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
rl.question('Enter the search query: ', (query) => {
  rl.close();

  // Encode the query string as a URL-encoded string
  const encodedQuery = encodeURIComponent(query);

  // Construct the URL for the Wikipedia API search endpoint
  const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=${encodedQuery}`;

  // Use the https module to make an HTTP GET request to the Wikipedia API
  https.get(url, (res) => {
    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        // Parse the response as JSON
        const data = JSON.parse(rawData);
        console.log(data); // Print the response data

        // TODO: Extract the article title and snippet from the response
        // and print them to the console
      } catch (e) {
        console.error(e.message);
      }
    });
  }).on('error', (e) => {
    console.error(`Got error: ${e.message}`);
  });
});
*/
