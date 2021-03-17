let pageSize = 12;
let currentPage;
let objectIDs;
GET /public/collection/v1/objects/[objectID]
"use strict";

async function loadObject(id) {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
  const response = await fetch(url);
  return response.json();
}
function buildArticleFromData(obj) {
  const article = document.createElement("article");
  const title = document.createElement("h2");
  const primaryImageSmall = document.createElement("img");
  const objectInfo = document.createElement("p");
  const objectName = document.createElement("span");
  const objectDate = document.createElement("span");
  const medium = document.createElement("p");

  title.textContent = obj.title;
  primaryImageSmall.src = obj.primaryImageSmall;
  primaryImageSmall.alt = obj.title;
  objectName.textContent = obj.objectName;
  objectDate.textContent = `, ${obj.objectDate}`;
  medium.textContent = obj.medium;

  article.appendChild(title);
  article.appendChild(primaryImageSmall);
  article.appendChild(objectInfo);
  article.appendChild(medium);

  objectInfo.appendChild(objectName);
  if(obj.objectDate) {
    objectInfo.appendChild(objectDate);
  }

  return article;
}

async function insertArticle(id) {
  const obj = await loadObject(id);
  const article = buildArticleFromData(obj);
  results.appendChild(article);
}

GET /public/collection/v1/search

async function loadSearch(query) {
  let baseURL = `https://collectionapi.metmuseum.org/public/collection/v1/search`;
  const response = await fetch(`${baseURL}?hasImages=true&q=${query}`);
  return response.json();
}

async function doSearch() {
  const result = await loadSearch(query.value);
  objectIDs = result.objectIDs || [];   // store the search result (or an empty list) in our variable
  count.textContent = `found ${objectIDs.length} results for "${query.value}"`;
  nPages.textContent = Math.ceil(objectIDs.length / pageSize);
  currentPage = 1;     // set the currentPage
  loadPage();          // load the appropriate page
}

query.addEventListener('change', doSearch);

function clearResults() {
  while(results.firstChild) {
    results.firstChild.remove();
  }
}
function loadPage() {
  clearResults();
  const myObjects = objectIDs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  myObjects.forEach(insertArticle);
  pageIndicator.textContent = currentPage;
}
