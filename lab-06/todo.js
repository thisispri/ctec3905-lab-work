"use strict";

function addItem(text, done) {
	const item = document.createElement('li');
	const label = document.createElement('label');
	const input = document.createElement('input');
	const button = document.createElement('button');
	label.textContent = text;
	input.type = "checkbox";
	input.checked = done;
	input.id = `todo${todo.querySelectorAll('li').length + 1}`;
	input.addEventListener('input', ev => {
		saveToStorage();
	});
	label.htmlFor = input.id;
	button.textContent = "×";
	button.addEventListener('click', ev => {
		item.remove();
		saveToStorage();
	});
	item.appendChild(input);
	item.appendChild(label);
	item.appendChild(button);
	todo.appendChild(item);
}
add.addEventListener('click', ev => {
	if(text.value) {
		addItem(text.value);
		text.value = null;
		text.focus();
		saveToStorage(); // <-- this is a new line
	}
});

function clearList() {
  while(todo.firstChild) {
    todo.removeChild(todo.firstChild);
  }
}

clear.addEventListener('click', ev => {
  clearList();
});

text.addEventListener('keydown', ev => {
  if(ev.key == "Enter") {
    add.click();
  }
});

function saveToStorage() {
	const elements = Array.from(todo.querySelectorAll('li'));
	const data = elements.map(el => {
		 return {
       text: el.querySelector('label').textContent,
			 done: el.querySelector('input').checked
		 }
	});
	localStorage.setItem(todo.id, JSON.stringify(data));
}
function loadFromStorage() {
	clearList();
	const data = JSON.parse(localStorage.getItem(todo.id));
	for (const item of data) {
		addItem(item.text, item.done);
	}
}

loadFromStorage();

clear.addEventListener('click', ev => {
  if(confirm("Are you sure you want to delete the entire list?")) {
    clearList();
    saveToStorage(); // <-- this is a new line
  }
});
