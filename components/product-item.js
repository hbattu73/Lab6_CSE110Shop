// product-item.js

class ProductItem extends HTMLElement {
  constructor() {
    super();
    // Create shadow root
    let shadow = this.attachShadow({mode: 'open'});

    // Create product-item component
    let wrapper = document.createElement('li');
    wrapper.setAttribute('class', 'product');
    let img = wrapper.appendChild(document.createElement('img'));
    img.setAttribute('src', this.getAttribute('img'));
    img.setAttribute('alt', this.getAttribute('title'));
    img.setAttribute('width', 200);
    let title = wrapper.appendChild(document.createElement('p'));
    title.setAttribute('class', 'title');
    title.textContent = this.getAttribute('title');
    let price = wrapper.appendChild(document.createElement('p'));
    price.setAttribute('class', 'price');
    price.textContent = '$' + this.getAttribute('price');

    // Implement cart functionality
    let button = wrapper.appendChild(document.createElement('button'));
    let id = this.getAttribute('id');
    let cart = JSON.parse(localStorage.getItem('cart-items'));
    if (cart.indexOf(id) > -1) {
      button.textContent = 'Remove from Cart';
    } 
    else {
      button.textContent = 'Add to Cart';
    }
    button.addEventListener('click', function() {
      cart = JSON.parse(localStorage.getItem('cart-items'));
      let count = document.getElementById('cart-count');
      if (cart.indexOf(id) > -1) {
        this.textContent = 'Add to Cart';
        count.textContent = cart.length - 1;
        cart.splice(cart.indexOf(id), 1);
        cart = localStorage.setItem('cart-items', JSON.stringify(cart));
      }
      else {
        this.textContent = 'Remove from Cart';
        count.textContent = cart.length + 1;
        cart.push(id);
        cart = localStorage.setItem('cart-items', JSON.stringify(cart));
      }
    });

    // CSS to apply to the shadow DOM
    let style = document.createElement('style');
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }`;

    // attach the created elements to the shadow DOM
    shadow.appendChild(wrapper);
    shadow.appendChild(style);
  }
}

customElements.define('product-item', ProductItem);
