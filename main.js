let removeItemsCartButtonCollection = document.getElementsByClassName('btn-danger');

let removeItemsCartButtons = [...removeItemsCartButtonCollection]

removeItemsCartButtons.forEach(element => {
    element.addEventListener('click', (event)=>{
        event.target.parentElement.parentElement.remove();
        updateCartTotal()
    }); 
});

function updateCartTotal(){
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    console.log(cartItemContainer);
    console.log(cartItemContainer);
}