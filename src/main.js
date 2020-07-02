//VARIABILE
let myList = document.querySelector('#myList');
let item = document.querySelector('#item');
let form = document.querySelector('#form');

events();
function events() {
    //  ON LOAD VALUES FROM UL ARE LOADED
    document.addEventListener('DOMContentLoaded', onLoadValues);
    //  Add item event
    form.addEventListener('submit', addItem);
    //  Remove item from my shopping list
    myList.addEventListener('click', removeFromMyShoppingList);
}


//add item to shoping list
function addItem(e) {
    let itemValue = item.value;
    if (!itemValue) {
            return;
        }

    let li = document.createElement('li');
    let spanInsideList = document.createElement('span');
    spanInsideList.textContent = itemValue;
    let divInsideList = document.createElement('div');
    divInsideList.className = 'delete-div';
    divInsideList.innerHTML = '<i class="far fa-trash-alt"></i>';

    li.appendChild(spanInsideList);
    li.appendChild(divInsideList);
    myList.appendChild(li);

      li.addEventListener('click', function () {
            spanInsideList.style.textDecoration = 'line-through';
            spanInsideList.style.textDecorationThickness = '3px';
            spanInsideList.style.textDecorationColor = '#c90c0f';

        });
        li.addEventListener('dblclick', function () {
            spanInsideList.style.textDecoration = 'none';
        });
    
    //Store in local storage
    onLoadlocalStorage(itemValue);

    //clear values on input
    item.value = '';

    //prevent default behaviour
    e.preventDefault();
}


function onLoadlocalStorage(value) {
    let values;
    if (localStorage.getItem('values') === null) {
        values = [];
    } else {
        values = JSON.parse(localStorage.getItem('values'));
    }

    values.push(value);
    localStorage.setItem('values', JSON.stringify(values));
}


//  Remove item from my shopping list
function removeFromMyShoppingList(e) {
    if (e.target.parentElement.classList.contains('delete-div'))
    e.target.parentElement.parentElement.remove();
    //  Remove from local storage
    removeFromLocalStorage(e.target.parentElement.parentElement);
}

//on load get values from local storage
function onLoadValues() {
    let values;
    if (localStorage.getItem('values') === null) {
        values = [];
    } else {
        values = JSON.parse(localStorage.getItem('values'));
    }

    values.forEach( (task) => {

        let li = document.createElement('li');
        let spanInsideList = document.createElement('span');
        spanInsideList.textContent = task;
        let divInsideList = document.createElement('div');
        divInsideList.className = 'delete-div';
        divInsideList.innerHTML = '<i class="far fa-trash-alt"></i>';

        li.appendChild(spanInsideList);
        li.appendChild(divInsideList);
        myList.appendChild(li);

        li.addEventListener('click', function () {
            spanInsideList.style.textDecoration = 'line-through';
            spanInsideList.style.textDecorationThickness = '3px';
            spanInsideList.style.textDecorationColor = '#c90c0f';

        });
        li.addEventListener('dblclick', function () {
            spanInsideList.style.textDecoration = 'none';
        });

    });
}


//  Remove from local storage
function removeFromLocalStorage(item) {
    let values;
    if (localStorage.getItem('values') === null) {
        values = [];
    } else {
        values = JSON.parse(localStorage.getItem('values'));
    }

    values.forEach( (value, index) => {
       if (item.textContent === value) {
           values.splice(index, 1);
       }
    });

    localStorage.setItem('values', JSON.stringify(values));
}
