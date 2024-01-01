const groceryList = document.getElementById('items');
const itemToBeAdded = document.getElementById('add-item');
const addItemButton = document.getElementById('add-item-btn');
const clearAllButton = document.getElementById('clear-all');
const searchBar = document.getElementById('search');

/**
 * Upon loading the webpage, any groceries \
 * saved to storage will be added to the grocery list.
 */
function populateDOMWithStorage() {
    let groceries = JSON.parse(getStorage());
    
    if (groceries.length > 0) {
        groceries.forEach(item => groceryList.appendChild(createItemForGroceryList(item)));
    }
}

/**
 * Wrapper function that handles adding \
 * a grocery item to the DOM. 
 * 
 * The grocery item will also be saved to storage.
 * @returns 
 */
function addItemToDOM() {
    if (itemToBeAdded.value === '') {
        alert('You must type the name of a grocery item to continue.');
        return;
    }
    
    groceryList.appendChild(createItemForGroceryList(itemToBeAdded.value));
    saveGroceryItemInStorage(itemToBeAdded.value);
    itemToBeAdded.value = '';
    updateUI();
}

/**
 * Creates the elements/nodes needed for \
 * adding populating the grocery item in the list.
 * @param {string} groceryItem 
 */
function createItemForGroceryList(groceryItem) {
    let itemToAdd = createElementBasedOnTagName('li');
    addClassesToElement(itemToAdd, 'item');
    itemToAdd.appendChild(document.createTextNode(groceryItem));
    itemToAdd.appendChild(createButton());
    return itemToAdd;
}

function createElementBasedOnTagName(tagName) {
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
    });

    element.classList.add(...classes);
}

function createButton() {
    let deleteButton = createElementBasedOnTagName('span');
    addClassesToElement(deleteButton, 'remove-item', 'fa-solid', 'fa-x');
    deleteButton.setAttribute('id', 'x');
    return deleteButton;
}

function removeAllGroceryItemsFromDOM() {
    if (confirm('You are about to remove all items from your grocery list, continue?')) {
        while (groceryList.firstChild) {
            groceryList.removeChild(groceryList.firstChild);
        }
        updateUI();
    }
}

function removeGroceryItemFromDOM(event) {
    let groceryItem = event.target;
    if (groceryItem.classList.contains('remove-item')) {
        const itemTile = groceryItem.parentElement;
        removeItem(itemTile);
        updateUI();
    }
}

function removeItem(item) {
    item.remove();
}

function filterGroceryItemsFromDOM(event) {
    let groceryItems = document.querySelectorAll('li');
    let searchText = event.target.value.toLowerCase();

    groceryItems.forEach(item => {
        let itemName = item.textContent.toLowerCase();
        if (itemName.indexOf(searchText) !== -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function updateUI() {
    let groceryItems = document.querySelectorAll('li');
    let inputSection = document.getElementById('input-section');

    if (groceryItems.length === 0) {
        searchBar.style.display = 'none';
        clearAllButton.style.display = 'none';
        inputSection.style.borderBottom = 'none';
    } else if (groceryItems.length >= 10) {
        searchBar.style.display = 'flex';
    } else {
        searchBar.style.display = 'none';
        clearAllButton.style.display = 'inline-block';
        inputSection.style.borderBottom = '1px solid #ccc';
    }
}

function saveGroceryItemInStorage(groceryItem) {
    let groceries = JSON.parse(getStorage());

    if (groceryItem !== null || groceryItem !== '') {
        groceries.push(groceryItem);
        localStorage.setItem('groceries', JSON.stringify(groceries));
    }
}

function getStorage() {
    let groceries = localStorage.getItem('groceries');

    if (groceries === null) {
        groceries = JSON.stringify([]);
    }

    return groceries;
}

addEventListener('DOMContentLoaded', populateDOMWithStorage);
addItemButton.addEventListener('click', addItemToDOM);
clearAllButton.addEventListener('click', removeAllGroceryItemsFromDOM);
groceryList.addEventListener('click', removeGroceryItemFromDOM);
searchBar.addEventListener('input', filterGroceryItemsFromDOM);
addEventListener('DOMContentLoaded', updateUI);