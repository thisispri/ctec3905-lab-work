"use strict";

function addItem(text) {
  const item = document.createElement('li');
  item.textContent = text;
  todo.appendChild(item);
}
add.addEventListener('click', ev => {
  addItem(text.value);
});
