const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearAll = document.getElementById('clear');
const itemFilter = document.getElementById('filter');



// Event Handle function
function addItem(e) {
  e.preventDefault();
  
  const button = createButton("remove-item btn-link text-red");
  const li = document.createElement('li');

  const item = document.createTextNode(itemInput.value);
  li.appendChild(item);
  li.appendChild(button);

  itemList.appendChild(li);
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


// function remove item
function removeItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
    }
  }
  checkUI();
}

// function clear all items
function clearAllItems(e) {
  console.log(itemList);
  while (itemList.firstChild) {
    itemList.firstChild.remove();
  }
  checkUI();
}

function checkUI() {

  const items = itemList.querySelectorAll('li');

  // there's no list item
  if (items.length === 0) {
    clearAll.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearAll.style.display = 'block';
    itemFilter.style.display = 'block';
  }
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



// Event Listeners
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearAll.addEventListener('click', clearAllItems);
itemFilter.addEventListener('input', filterItems);
