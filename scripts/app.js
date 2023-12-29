
let groceryList = document.getElementById('items');
    
const itemToBeAdded = document.getElementById('add-item');
const addItemButton = document.getElementById('add-item-btn');
const clearAllButton = document.getElementById('clear-all');

function addItemToDOM() {
    if (itemToBeAdded.value === '') {
        alert('You must type the name of a grocery item to continue.');
        return;
    }

    addItemToGroceryList(itemToBeAdded.value);
    itemToBeAdded.value = '';
}

function addItemToGroceryList(item) {
    let itemToAdd = createElement('li');
    addClassesToElement(itemToAdd, 'item');
    itemToAdd.appendChild(document.createTextNode(item));
    itemToAdd.appendChild(createButton());
    groceryList.appendChild(itemToAdd);
}

function createElement(tagName) {
    return document.createElement(tagName);
}

function addClassesToElement(element, ...classes) {
    if (!element instanceof HTMLElement) {
        console.error('Invalid element provided.');
        return;
    }

    classes.forEach(className => {
        if (typeof className !== 'string') {
            console.error('Class names need to be strings.');
            return;
        }
    })

    element.classList.add(...classes);
}

function createButton() {
    let deleteButton = createElement('span');
    addClassesToElement(deleteButton, 'remove-item', 'fa-solid', 'fa-x');
    deleteButton.setAttribute('id', 'x');
    return deleteButton;
}

function removeAllGroceryItemsFromDOM() {
    if (window.confirm('This action will delete all grocery items, are you sure?')) {
        groceryList.forEach(groceryItem, () => {
            removeItem(groceryItem);
        });
    }
}

function removeGroceryItemFromDOM(e) {
    let groceryItem = e.target;
    if (groceryItem.classList.contains('remove-item')) {
        removeItem(groceryItem.parentElement);
    }
}

function removeItem(item) {
    item.remove();
}

addItemButton.addEventListener('click', addItemToDOM);
clearAllButton.addEventListener('click', removeAllGroceryItemsFromDOM);
groceryList.addEventListener('click', removeGroceryItemFromDOM);

