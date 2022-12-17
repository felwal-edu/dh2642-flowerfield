import log from "@/utils/logUtils";

const API_ENDPOINT = "https://en.wikipedia.org/w/api.php";
const BASE_URL_REST_V1 = "https://en.wikipedia.org/api/rest_v1/"

async function getFlowerArticle(flowerName) {
  function containsWhitespace(str) {
    return /\s/.test(str);
  }

  // if we only send a genus / species and not both
  // we add (plant) to the string, to make sure wikipedia picks out the plant
  // and not other articles...
  if (!containsWhitespace(flowerName)) {
    flowerName = flowerName + " (plant)";
  }

  // Make a request to the Wikipedia API to search for articles based on the latin flower name.
  const response =
    await fetch(`${API_ENDPOINT}?action=query&format=json&list=search&utf8=1&formatversion=2&srsearch=${flowerName}&srprop=size&origin=*`);

  // Parse the response to extract the URL of the Wikipedia article for the flower
  const data = await response.json();
  const article = data.query.search[0];

  // Encode article title of the flower, will result in the common name (the correct article name) for the flower
  let title = encodeURIComponent(article.title.toLowerCase());

  /*
  const articleResponse = await fetch(`${API_ENDPOINT}?format=json&action=query&prop=revisions&titles=${title}
    &rvslots=*&rvprop=content&formatversion=2&origin=*&redirects=1`);
  // Extract the information we are interested in from the API response
  const pageId = Object.keys(articleData.query.pages)[0];
  const content = articleData.query.pages[pageId].revisions[0].slots.main.content;
  */

  // Make a request to the wikipedia article to get the exact article based on the common flower name.
  // Using rest_v1 for better formatting on fetch
  const articlePage = await fetch(`${BASE_URL_REST_V1}page/summary/${title}?origin=*`);
  const articleData = await articlePage.json();
  log.d(articleData);
  console.log(articleData);
  const content = articleData.extract_html;

  return content;
}

export function getArticleByPlantName(scientificName) {
  return getFlowerArticle(scientificName).then(articleContent => {
    return articleContent;
  });
}

/*
//import { PLANTID_KEY } from "./plantIdSecrets";
const BASE_URL = `https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&utf8=1&srsearch=`;

export function getArticleByPlantName(scientificName) {
    let encodedQuery = encodeURIComponent(scientificName)
    console.log(encodedQuery);
  return callAPI(encodedQuery);
}

function callAPI(params) {
  return fetch(BASE_URL + params, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },

    //body: JSON.stringify(data),
  }).then(treatHTTPResponseACB);
}

export function treatHTTPResponseACB(response) {
  if (response.ok) {
    return response.json();
  }

  throw new Error("API problem: " + response.status);
}

/*
// Example program that uses the Wikipedia API to search for an article
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
