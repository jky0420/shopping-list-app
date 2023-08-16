const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');


// Event Handle function
function addItem(e) {
  e.preventDefault();
  
  const button = createButton("remove-item btn-link text-red");
  const li = document.createElement('li');

  const item = document.createTextNode(itemInput.value);
  li.appendChild(item);
  li.appendChild(button);
  itemList.appendChild(li);

  itemInput.value = '';
}

// function that create button
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
  
}

// function that create icon
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}


// Event Listeners
itemForm.addEventListener('submit', addItem);