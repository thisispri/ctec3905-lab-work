GET /public/collection/v1/objects/[objectID]
"use strict";

async function loadObject(id) {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`;
  const response = await fetch(url);
  return response.json();
}
function buildArticleFromData(obj) {
  const article = document.createElement("article");
  const img = document.createElement("img");
  img.src = obj.primaryImageSmall;
  img.alt = obj.title;
  article.appendChild(img);
  return article;
}
