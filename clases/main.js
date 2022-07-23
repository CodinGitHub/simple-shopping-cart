import {ShopItem} from './clases.js';

let shopItemsArray = [];
let cartItemsArray = [];
let shoppingcart = [];
let total = 0;

// Crear los objetos disponibles en la tienda
let shopItems = document.querySelectorAll('.shop-item');
shopItems = [...shopItems];

shopItems.forEach((shopItem, index)=>{
    let description = shopItem.childNodes[1].innerText;
    let img = shopItem.childNodes[3].src.substring(21);
    let price = parseFloat(shopItem.childNodes[5].childNodes[1].innerText.substring(1));
    let album = new ShopItem(index, img, description, price, 1)    
    shopItemsArray.push(album)
})

console.log(shopItemsArray)


// Crear los objetos disponibles dentro del carro de compras
let cart = document.querySelector('.cart-items');

/*--------------------------Agregar productos al carro--------------------------*/
let addBtn = document.querySelectorAll('.shop-item-button');
addBtn = [...addBtn];

addBtn.forEach((singleAddBtn, index) => {
    singleAddBtn.addEventListener('click', event=>{
        // agrego el elemnto al carro
        

        // consulto si el item existe para aumentar su cantidad
        let itemRepeated = shoppingcart.find(item => item.id == index)
        if (itemRepeated != undefined){
            itemRepeated.quantity += 1;
        }else{
            shoppingcart.push(shopItemsArray[index]);
        }
        total = getTotal(shoppingcart)
        drawItems()
    })
} )


function drawItems(){
    cart.innerHTML = '';
    shoppingcart.forEach(cartItem =>{
        cart.innerHTML += `
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src="..${cartItem.img}" width="100" height="100">
                <span class="cart-item-title">${cartItem.description}</span>
            </div>
            <span class="cart-price cart-column">$${cartItem.price}</span>
            <div class="cart-quantity cart-column">
                <input class="cart-quantity-input" min="1" type="number" value="${cartItem.quantity}">
                <button class="btn btn-danger" type="button">REMOVE</button>
            </div>
        </div>
        `
    })

    /*---------------Imprimir total en pantalla------------- */
    let totalContainer = document.querySelector('.cart-total-price');
    
    totalContainer .innerText = `$${total}`;

}


/*--------------------------Remover productos del carro--------------------------*/
let removeItemsCartButtons = document.getElementsByClassName('btn-danger');
removeItemsCartButtons = [...removeItemsCartButtons]

removeItemsCartButtons.forEach(element => {
    element.addEventListener('click', (event)=>{
        console.log('remover')
        // cartItemsArray.find(element.)
    }); 
});

/*--------------Obtener valor total -------------*/
function getTotal(){
    return shopItemsArray.reduce((sum, item)=>{
        console.log(item.price)
        return sum + item.price*item.quantity
    },0)
}



function updateNumberOfItems(){
    /*---------------------------Actualizar numero de items----------------------------------*/
    let numericInputs = document.querySelectorAll('.cart-quantity-input');
    numericInputs = [...numericInputs]
    numericInputs.forEach(item => {
        item.addEventListener('click', event => {
            //conseguir el id del producto
            let productDescription = event.target.parentElement.parentElement.childNodes[1].innerText;
            let productWithId =  shopItemsArray.find(item => item.description == productDescription)
            
            //actualizar el objeto item
            productWithId.quantity = parseInt(event.target.value)
            console.log(shoppingcart)

            //actualizar el precio total
            total = getTotal(shoppingcart)

            //dibujar
            
            drawItems()
        });
        item.addEventListener('keydown', event => {

            total = getTotal(shoppingcart)
        });
    })
    updateNumberOfItems()
}