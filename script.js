const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter');


function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if (newItem === '') {
alert ('Please add an item.');
return;
    }
 const li = document.createElement('li');
 li.appendChild(document.createTextNode(newItem));
 const button = createButton('remove-item btn-link text-red');
 li.appendChild(button);
 itemList.appendChild(li);
 checkUI();
 itemInput.value = '';
 console.log(button);
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

function removeItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
       if(confirm('Are you sure you want to remove this item?')) {
        e.target.parentElement.parentElement.remove();
        checkUI();
       } 
    }
}

    function clearItems() {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
        }
        checkUI();
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
    }

itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearItems);

checkUI();