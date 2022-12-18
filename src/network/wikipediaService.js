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
  log.d("articleData", articleData);

  const content = articleData.extract_html;
  const url = articleData.content_urls.desktop.page;

  // remove outmost <p> tag, since we will place in within another <p>
  const contentWithUrl = content.replace("<p>", "").replace("</p>", "")
    + " <a target='_blank' rel='noopener noreferrer' href='" + url + "'>read more</a>";

    return contentWithUrl;
}

export function getArticleByPlantName(scientificName) {
  return getFlowerArticle(scientificName).then((articleContent) => {
    return articleContent;
  });
}
