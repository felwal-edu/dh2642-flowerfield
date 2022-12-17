async function getFlowerArticle(flowerName) {
  //const API_ENDPOINT = "https://en.wikipedia.org/w/api.php";
  const API_ENDPOINT = "https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php";

  // Make a request to the Wikipedia API to search for articles based on the flower name
  const response = await fetch(`${API_ENDPOINT}?action=query&format=json&list=search&utf8=1&formatversion=2&srsearch=${flowerName}&srprop=size`);

  // Parse the response to extract the URL of the Wikipedia article for the flower
  const data = await response.json();
  const article = data.query.search[0];
  const articleUrl = `https://en.wikipedia.org/wiki/${article.title}`;

  // Retrieve the content of the Wikipedia article
  const articleResponse = await fetch(articleUrl);
  const articleHtml = await articleResponse.text();

  // Extract the content of the Wikipedia article from the HTML
  const parser = new DOMParser();
  const articleDoc = parser.parseFromString(articleHtml, "text/html");
  const articleContent = articleDoc.querySelector(".mw-parser-output").innerHTML;

  return articleContent;
}

export function getArticleByPlantName(scientificName) {
  getFlowerArticle(scientificName).then(articleContent => {
    console.log(articleContent);
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
