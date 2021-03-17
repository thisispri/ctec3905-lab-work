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
