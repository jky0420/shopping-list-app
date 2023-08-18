const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAll = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formButton = itemForm.querySelector('button');
let isEditMode = false;





// Event Handle function

function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
  checkUI();
}







function addItem(e) {
  e.preventDefault();
  const newItem = itemInput.value;

  //Check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('That item already exists!');
      itemInput.value = '';
      return;
    }
  } 


  const button = createButton("remove-item btn-link text-red");
  const li = document.createElement('li');

  const item = document.createTextNode(newItem);
  li.appendChild(item);
  li.appendChild(button);

  itemList.appendChild(li);

  addItemToStorage(newItem);
  checkUI();

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

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemtoEdit(e.target);
    console.log(e.target);
  }
}

function setItemtoEdit(item) {
  isEditMode = true;

  itemList.querySelectorAll('li').forEach(item => item.classList.remove('edit-mode'));

  item.classList.add('edit-mode');
  formButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
  formButton.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
}


// function remove item
function removeItem(item) {
  if (confirm('Are you sure?')) {
    // REmove item from DOM
    item.remove();
  } 

  // Remove item from Storage
  removeItemFromStorage(item.textContent);
  checkUI();
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage();

  // Filter out item to be removed
  itemsFromStorage = itemsFromStorage.filter(i => i !== item);

  // Re-set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));

}

// function clear all items
function clearAllItems(e) {
  console.log(itemList);
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  // Clear from localStorage
  localStorage.removeItem('items');
  checkUI();
}

function checkUI() {
  itemInput.value = '';
  const items = itemList.querySelectorAll('li');

  // there's no list item
  if (items.length === 0) {
    clearAll.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearAll.style.display = 'block';
    itemFilter.style.display = 'block';
  }
  formButton.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formButton.style.backgroundColor = '#333';

  isEditMode = false;
}

checkUI();


function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li');
  items.forEach(item => {
    const itemName = item.innerText.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  })
}

function addItemToDOM(items) {
  const button = createButton("remove-item btn-link text-red");
  const li = document.createElement('li');

  const item = document.createTextNode(items);
  li.appendChild(item);
  li.appendChild(button);

  itemList.appendChild(li);
}




function getItemsFromStorage() {
  let itemsFromStorage;
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }

  console.log(itemsFromStorage);
  return itemsFromStorage;
}


function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.push(item);

  // Convert to JSON string and set to localStorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}


function checkIfItemExists(item) {
  const itemsFromStorage = getItemsFromStorage();

  // if (itemsFromStorage.includes(item)) {
  //   return true;
  // } else {
  //   return false;
  // }
  return itemsFromStorage.includes(item);
}



// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', onClickItem);
clearAll.addEventListener('click', clearAllItems);
itemFilter.addEventListener('input', filterItems);
document.addEventListener('DOMContentLoaded', displayItems);
