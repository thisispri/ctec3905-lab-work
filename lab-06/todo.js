"use strict";

function addItem(text, done) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');
  label.textContent = text;
  input.type = "checkbox";
  input.checked = done;
  input.id = `todo${todo.querySelectorAll('li').length + 1}`;
  label.htmlFor = input.id;
  item.appendChild(label);
  item.appendChild(input);
  todo.appendChild(item);
}
add.addEventListener('click', ev => {
  addItem(text.value);
});
