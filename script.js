const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');
const formBtn = itemForm.querySelector('button');
let isEditMode = false;

function displayItems() {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItemToDOM(item));
checkUI;
}
function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === '') {
alert ('Please add an item.');
return;
    }
addItemToDOM(newItem);
addItemToStorage(newItem);
 checkUI();
 itemInput.value = '';
}

// This isn't working because the HTML calling isn't working properly
if(isEditMode) {
    const itemToEdit = itemList.querySelector('edit-mode');
    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove('edit-mode');
    itemToEdit.remove();
    isEditMode = false;
}
else {
    if (checkIfItemExists(newItem))
    {
        alert('That item is already in the list!');
        return;
    }
}


function addItemToDOM(item) {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
}

function getItemsFromStorage () {
    let itemsFromStorage;
    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    }

    else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

return itemsFromStorage;
}


function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark');
    button.appendChild(icon);

    return button;
    

}

function createIcon(classes){
    const icon = document.createElement('i');
    icon.classname = classes;
    return icon;
}

function addItemToStorage (item) {
    let itemsFromStorage;
    if (localStorage.getItem('items') == null) {
        itemsFromStorage = [];
    }

    else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    itemsFromStorage.push(item);
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains ('remove-item')) {
        removeItem(e.target.parentElement);
    }
    else {
setItemToEdit(e.target);
    }
}

function setItemToEdit(item) {
    isEditMode = true;
    itemList.querySelectorAll('li').forEach(i => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode'); // dunno why this isn't calling correctly, same problem with my little x boxes
    formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
    formBtn.style.backgroundColor = '#228B22';
    itemInput.value = item.textContent;
}

function removeItem(item) {
    if (confirm('Are you sure?')) {
        item.remove();
        removeItemFromStorage(item.textContent);
    }
    checkUI;
       } 

       function removeItemFromStorage(item) {
        let itemsFromStorage = getItemsFromStorage();
        itemsFromStorage = itemsFromStorage.filter((i) => i !== item);
        localStorage.setItem('items', JSON.stringify(itemsFromStorage));
       }
    

    function clearItems() {
        itemInput.value = '';
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        localStorage.removeItem('items');
        checkUI();
    }

    function filterItems(e) {
        const items = itemList.querySelectorAll('li');
        const text = e.target.value.toLowerCase();

        items.forEach( item => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
        item.style.display = 'flex';
    }
    else {
        item.style.display = 'none';
    }
 });
        
    }

    function checkIfItemExists (item) {
        const itemsFromStorage = getItemsFromStorage();
       return itemsFromStorage = getItemsFromStorage();
    }

    function checkUI() {
        const items = itemList.querySelectorAll('li');
if (items.length === 0) {
    clearBtn.style.display = 'none';
    itemFilter.style.display = 'none';
} else {
    clearBtn.style.display = 'block';
    itemFilter.style.display = 'block';
}
formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
formBtn.style.backgroundColor = '#333';

isEditMode = false;
    }


    function init() {
        itemForm.addEventListener('submit', onAddItemSubmit);
        itemList.addEventListener('click', onClickItem);
        clearBtn.addEventListener('click', clearItems);
        itemFilter.addEventListener ('input', filterItems);
        document.addEventListener('DOMContentLoaded', displayItems);
        checkUI();
    }

init();

//never figured out why the red x wouldn't show up. Like, it appears on the other ones, the functionality works, it's just the new items. I tried several methods. HTML calling seems to not be working