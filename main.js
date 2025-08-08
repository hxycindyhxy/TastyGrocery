//Make a Cart Instance
function getCart() {
  const cart = localStorage.getItem('cart');
  if (!cart) return [];

  const rawCart = JSON.parse(cart);

  const uniqueCart = [];
  const seenProducts = new Set();

  for (let i = rawCart.length - 1; i >= 0; i--) {
    const productName = Object.keys(rawCart[i])[0];
    if (!seenProducts.has(productName)) {
      uniqueCart.unshift(rawCart[i]); 
      seenProducts.add(productName);
    }
  }
  return uniqueCart;
}

// Check Loading Stock Status
function checkStatus() {
  const currentCart = getCart()
  const productButtons = document.querySelectorAll('.add-button');
  const productStatuses = document.querySelectorAll('.item-stock-status');
  for (const item of currentCart) {
      const productName = Object.keys(item)[0];
      const itemQuantity = item[Object.keys(item)[0]]
      const productButton = Array.from(productButtons).find(btn => 
        btn.getAttribute('data-name') === productName
      );
      const stockNumber = productButton.getAttribute('data-stockNumber');
      productButton.disabled = itemQuantity >= stockNumber;
      
      const productStatus = Array.from(productStatuses).find(status => 
        status.getAttribute('data-name') === productName
      );
      if (itemQuantity >= stockNumber) {
        productStatus.textContent = "Out of Stock";
      } else {
        productStatus.textContent = "In Stock";
      }
  }; 
}

checkStatus()

//Check Out Button Status
function checkOutStatusCheck() {
  const displayCart = localStorage.getItem('cart');
  if ((displayCart === null) || (displayCart.length === 2)) {
    checkOutBtn.disabled = true;
  } else {
    checkOutBtn.disabled = false;
  }
}

//Shopping Cart Displayed
const cartPage = document.getElementById('cart-page');
const cartCloseBtn = document.getElementById('cart-close-btn');
const cartBtn = document.getElementById('cart-btn');
const checkOutBtn = document.getElementById('check-out-btn');

cartCloseBtn.addEventListener('click', () => {
  cartPage.style.display = 'none';
  checkStatus()
})

cartBtn.addEventListener('click', () => {
  cartPage.style.display = 'flex';
  checkOutStatusCheck()
  displayItemCart()
})

checkOutBtn.addEventListener('click', ()=> {
  window.location.href = "delivery.php";
})

//Shopping Cart Functions
function displayItemCart() {
  const displayCart = getCart()
  
  if (displayCart.length === 0) {
      removeAllBtn.style.display = "none";
  } else {
      removeAllBtn.style.display = "block";
  }
  
  const cartContainer = document.getElementById("cart-item-list");
  cartContainer.innerHTML = '';
  
  const productButtons = document.querySelectorAll('.add-button');
  
  for (const item of displayCart) {
    const productName = Object.keys(item)[0];
    const itemQuantity = item[Object.keys(item)[0]]
    
    const productButton = Array.from(productButtons).find(btn => 
      btn.getAttribute('data-name') === productName
    );
    
    const image = productButton.getAttribute('data-image');
    const price = productButton.getAttribute('data-price');
    const unit = productButton.getAttribute('data-unit');
    const stockNumber = productButton.getAttribute('data-stockNumber');
    
    const cartItemHTML = `
        <div class="cart-item">
          <div class="cart-item-image">
            <img src="${image}" alt="${productName}">
          </div>
          <div class="cart-item-name">${productName}</div>
          <div class="cart-item-unit-price"><span>$</span>${price}<br>${unit}</div>
          <div class="cart-item-quantity">
            <button class="minus-btn" data-name="${productName}">&nbsp;-&nbsp;</button>
            <span class="quantity-number">${itemQuantity}</span>
            <button class="plus-btn" data-name="${productName}">&nbsp;+&nbsp;</button>
          </div>
          <div class="cart-item-remove">
            <button class="remove-one-btn" data-name="${productName}">
              <img src="img/bin.png" alt="bin">
            </button>
          </div>
        </div>
      `;
    
    cartContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    
    const minusBtn = document.querySelector(`.minus-btn[data-name="${productName}"]`);
    minusBtn.disabled = itemQuantity <= 1;
    
    const plusBtn = document.querySelector(`.plus-btn[data-name="${productName}"]`);
    plusBtn.disabled = itemQuantity >= stockNumber;
    productButton.disabled = itemQuantity >= stockNumber;
    
    if ((minusBtn.disabled === true) && (plusBtn.disabled === true)) {
      let cart = getCart().filter(item => Object.keys(item)[0] !== productName);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayItemCart();
    }
  }
  totalPrice()
  
  //Remove Item
  document.querySelectorAll('.remove-one-btn').forEach(btn => {
    btn.onclick = () => {
      const productName = btn.getAttribute('data-name');
      let cart = getCart().filter(item => Object.keys(item)[0] !== productName);
      localStorage.setItem('cart', JSON.stringify(cart));
      displayItemCart();
      
      const productStatuses = document.querySelectorAll('.item-stock-status');
      const productStatus = Array.from(productStatuses).find(status => 
        status.getAttribute('data-name') === productName
      );
        productStatus.textContent = "In Stock";
      
      const productButton = Array.from(productButtons).find(btn => 
        btn.getAttribute('data-name') === productName
      );
      productButton.disabled = false
      
      checkOutStatusCheck()
    };
  });
  
  // Increase Quantity
  document.querySelectorAll('.plus-btn').forEach(btn => {
    btn.onclick = () => {
      const displayCart = getCart()
      const productName = btn.getAttribute('data-name');
      const existingItem = displayCart.find(item => Object.keys(item)[0] === productName);
      let productQuantity = existingItem[productName] + 1;
      existingItem[productName] = productQuantity;
      localStorage.setItem('cart', JSON.stringify(displayCart));
      displayItemCart();
    };
  });
  
  //Decrease Quantity
    document.querySelectorAll('.minus-btn').forEach(btn => {
    btn.onclick = () => {
      const displayCart = getCart()
      const productName = btn.getAttribute('data-name');
      const existingItem = displayCart.find(item => Object.keys(item)[0] === productName);
      let productQuantity = existingItem[productName] - 1;
      existingItem[productName] = productQuantity;
      localStorage.setItem('cart', JSON.stringify(displayCart));
      displayItemCart();
    };
  });
  
}

function totalPrice() {
  const displayCart = getCart()
  
  let totalPrice = 0
  
  for (const item of displayCart) {
    const productName = Object.keys(item)[0];
    const itemQuantity = item[Object.keys(item)[0]]
    
    const productButtons = document.querySelectorAll('.add-button');
    
    const productButton = Array.from(productButtons).find(btn => 
      btn.getAttribute('data-name') === productName
    );
    const price = productButton.getAttribute('data-price');
    
    const productConsumption = price * itemQuantity
    totalPrice += productConsumption
  }
  const totalPriceContainer = document.getElementById("cart-total-price")
  totalPriceContainer.innerText = totalPrice
}

//Add Item
const addButtons = document.querySelectorAll('.add-button');
addButtons.forEach(button => {
  button.addEventListener('click', function() {
    const productName = button.getAttribute('data-name');
    
    let currentCart = getCart()
    
    const existingItem = currentCart.find(item => Object.keys(item)[0] === productName);
    
    let productQuantity = 1;
    
    if (existingItem) {
      productQuantity = existingItem[productName] + 1;
      existingItem[productName] = productQuantity;
    } else {
      currentCart.push({ [productName]: productQuantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(currentCart));
    
    displayItemCart();
  });
});


//Remove All Items
const removeAllBtn = document.getElementById('remove-all-btn');

removeAllBtn.addEventListener('click', ()=> {
  localStorage.removeItem('cart');
  displayItemCart()
  checkOutStatusCheck()
})

