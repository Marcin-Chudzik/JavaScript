let ul;
let newItemForm;
let inputError;
let shoppingList = ['eggs', 'butter', 'bread', 'milk', 'tea', 'salami']

document.addEventListener('DOMContentLoaded', () => {
    ul = document.getElementById('shoppingList');
    newItemForm = document.getElementById('newItemForm');
    inputError = document.getElementById('inputError');

    newItemForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let newItem = event.target.elements[0];

        if (newItem.value.length > 2 && !newItem.value.startsWith(' ')) {
        addListItem(newItem.value);
        newItem.value = "";
        inputError.innerText = '';
        newItem.classList.remove('input-danger');
        } else {
        inputError.innerText = 'Valid input: min. 3 chars!';
        newItem.classList.add('input-danger');
        }
    })

    for (let shoppingItem of shoppingList) {
        addListItem(shoppingItem);
    }
})

function addListItem(shoppingItem) {
    let li = document.createElement('li');
    li.innerText = shoppingItem;
    ul.appendChild(li);
}