// Script.js
var products; // holds the products
var cart; // holds product id's
window.addEventListener('DOMContentLoaded', async () => {
  // If key DNE in local storage, fetch from endpoint and store
  if (localStorage.getItem('products') === null) {
    await fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('products', JSON.stringify(data));
      products = JSON.parse(localStorage.getItem('products'));
      console.log('Success:', products);
    })
    .catch(error => {
      console.error('Error in request:', error);
    })
  }
  // Else retrieve from storage and store
  else {
    products = JSON.parse(localStorage.getItem('products'));
  }

  // If cart DNE in local storage, store an empty cart in local storage
  if (localStorage.getItem('cart-items') === null) {
    cart = [];
    localStorage.setItem('cart-items', JSON.stringify(cart));
  }
  // Else, retrieve and restore cart count 
  else {
    cart = JSON.parse(localStorage.getItem('cart-items'));
    document.getElementById('cart-count').textContent = cart.length;
  }

  // Append product item to product-list container
  let container = document.getElementById('product-list');
  for (let i = 0; i < products.length; i++) {
    let image = String(products[i].image);
    let title = String(products[i].title);
    let price = String(products[i].price);
    let id = String(products[i].id);
    container.innerHTML += `<product-item img=${image} title=${title} price=${price} id=${id}></product-item>`;
  }
});
// Comment out below to clear local storage on refresh
// window.onbeforeunload = function() {
//   localStorage.removeItem('products');
//   localStorage.removeItem('cart-items');
//   return '';
// };
