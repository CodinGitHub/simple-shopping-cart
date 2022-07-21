/* Todos los elementos de las cart */
let cart = document.querySelector('.cart-items');

/*----------------Remover articulos------------------------- */
let removeItemsCartButtons = document.getElementsByClassName('btn-danger');
removeItemsCartButtons = [...removeItemsCartButtons]
removeItemsCartButtons.forEach(element => {
    element.addEventListener('click', (event)=>{
        let buttonClicked = event.target;
        buttonClicked.parentElement.parentElement.remove();
        updateNumberOfElements()
        updateCartTotal()
    }); 
});

updateCartTotal()

function updateNumberOfElements(){
    cart = document.querySelector('.cart-items');
    numericInputs = document.querySelectorAll('.cart-quantity-input');
    numericInputs = [...numericInputs]

    /*-------------------------Doble Remover articulos---------------- */
    removeItemsCartButtons = document.getElementsByClassName('btn-danger');
    removeItemsCartButtons = [...removeItemsCartButtons]
    removeItemsCartButtons.forEach(element => {
        element.addEventListener('click', (event)=>{
            let buttonClicked = event.target;
            buttonClicked.parentElement.parentElement.remove();
            updateNumberOfElements()
            updateCartTotal()
        }); 
    });

    /*---------------------------Actualizar numero de items----------------------------------*/
    console.log(numericInputs)
    numericInputs.forEach(item => {
        item.addEventListener('click', event => {
            // updateNumberOfElements()
            updateCartTotal()
        });
        item.addEventListener('keydown', event => {
            // updateNumberOfElements()
            updateCartTotal()
        });
    })
    
}


function updateCartTotal(){
    cart = document.querySelector('.cart-items');
    let listaActualizada = document.getElementsByClassName('cart-row');
    listaActualizada = [...listaActualizada]
    // console.log(listaActualizada)

    let total = 0;
    listaActualizada.forEach((item, index) => {
            if (index != 0){
                let precio = parseFloat(item.childNodes[3].innerText.substring(1));
                let cant = parseFloat(item.childNodes[5].childNodes[1].value);   
                total = precio*cant + total;
                total = parseFloat(total.toFixed(2));
            }
    })

    /*---------------Imprimir total en pantalla------------- */
    let totalContainer = document.querySelector('.cart-total-price');
    
    totalContainer .innerText = `$${total}`;
    return cart;
}

/*---------------------------Actualizar numero de items----------------------------------*/
let numericInputs = document.querySelectorAll('.cart-quantity-input');
numericInputs = [...numericInputs]
numericInputs.forEach(item => {
    item.addEventListener('click', event => {
        // updateNumberOfElements()
        updateCartTotal()
    });
    item.addEventListener('keydown', event => {
        // updateNumberOfElements()
        updateCartTotal()
    });
})



/*--------------------------Agregar productos al carro--------------------------*/
let addBtn = document.querySelectorAll('.shop-item-button');
addBtn = [...addBtn];

addBtn.forEach(singleAddBtn => {
    singleAddBtn.addEventListener('click', event=>{
        
        let priceItem = parseFloat(event.target.parentElement.childNodes[1].innerText.substring(1));
        
        // console.log(priceItem)
        cart.innerHTML += `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="Images/Shirt.png" width="100" height="100">
                <span class="cart-item-title">T-Shirt</span>
            </div>
            <span class="cart-price cart-column">$${priceItem}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" min="1" type="number" value="1">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>
        `
        updateNumberOfElements()
        updateCartTotal()
    })
} )
