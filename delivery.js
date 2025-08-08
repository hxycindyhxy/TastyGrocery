//Get All the Input Box
const emailInput = document.getElementById('email-input');
const firstNameInput = document.getElementById('first-name-input');
const lastNameInput = document.getElementById('last-name-input');
const mobileInput = document.getElementById('mobile-input');
const streetInput = document.getElementById('address-input');
const cityInput = document.getElementById('city-input');

const placeOrderBtn = document.getElementById('place-order-btn');
placeOrderBtn.disabled = true;

const takeBackBtn = document.getElementById('takeBackBtn');

let emailPass = false;
let firstNamePass = false;
let lastNamePass = false;
let mobilePass = false;
let streetPass = false;
let cityPass = false;
  
//Place Order Button
function changeOrderBtnStatus() {
  if ((emailPass === true) && (firstNamePass === true) && (lastNamePass === true) && (mobilePass === true) && (streetPass === true) && (cityPass === true)) {
    placeOrderBtn.disabled = false;
  } else {
    placeOrderBtn.disabled = true;
  }
}

placeOrderBtn.addEventListener('click', async () => {
  try {
    const msg = await checkStockValidation();
    console.log(msg)
    
    if (msg === false) {
      placeOrderBtn.style.display = "none";
      takeBackBtn.style.display = "block";
    } else {
      // window.location.href = "confirmation.html";
      // localStorage.removeItem('cart');
      const cart = JSON.parse(localStorage.getItem('cart'));
      const response = await fetch('updateDatabase.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cart })
      });
        
      const result = await response.json();
      
      if (result.success) {
        window.location.href = "confirmation.html";
        localStorage.removeItem('cart');
      } else {
        alert('Error:', error);
      }
    }  
    } catch (error) {
      alert('Error:', error);
    }
});


//Validate the Number of Stock
async function checkStockValidation() {
  try {
    const response = await fetch('validation.php');
    const data = await response.json();
    const msg = await matchItemToStock(data); 
    return msg;
  } catch (error) {
    console.error('Error:', error);
  }
};

function matchItemToStock(data) {
  let validateMsgList = ""
  
  let cart = localStorage.getItem('cart')
  cart = JSON.parse(cart);

  for (const cartItem of cart) {
    for (let key in cartItem) {
      let productName = key;
      let quantityInCart = cartItem[key];
      
      const productStockData = data.find(item => item.Name === productName);
      if (quantityInCart > productStockData.StockNumber) {
        validateMsgList += `${productName} `;
      };
    }
  };
  if (validateMsgList !== "") {
    postInvalidMsg(validateMsgList);
    return false;
  } else {
    return true;
  }
}

function postInvalidMsg(validateMsgList) {
  const invalidMsgContainer = document.getElementById("validation")
  
  invalidMsgContainer.innerHTML = ''
  
  const invalidHTML = `
  <div>The following products are out of stock:</div>
  <div>${validateMsgList}</div>
  `;
  
  invalidMsgContainer.insertAdjacentHTML('beforeend', invalidHTML);
}


//Validate First Name
firstNameInput.addEventListener('focus', ()=> {
  const firstNameAlert = document.getElementById("first-name-alert")
  firstNameAlert.innerHTML = "";
  firstNameInput.style.borderColor = 'rgb(224, 220, 217)';
})

firstNameInput.addEventListener('blur', ()=> {
  if (firstNameInput.value === '') {
    const firstNameAlert = document.getElementById("first-name-alert")
    const alertHTML = `<div class="alert-msg">&nbsp;Enter a first name</div>`
    firstNameAlert.insertAdjacentHTML('beforeend', alertHTML);
    firstNameInput.style.borderColor = 'red';
    firstNamePass = false;
  } else {
    firstNamePass = true;
  }
  changeOrderBtnStatus()
})

//Validate Last Name
lastNameInput.addEventListener('focus', ()=> {
  const lastNameAlert = document.getElementById("last-name-alert")
  lastNameAlert.innerHTML = "";
  lastNameInput.style.borderColor = 'rgb(224, 220, 217)';
})

lastNameInput.addEventListener('blur', ()=> {
  if (lastNameInput.value === '') {
    const lastNameAlert = document.getElementById("last-name-alert")
    const alertHTML = `<div class="alert-msg">&nbsp;Enter a last name</div>`
    lastNameAlert.insertAdjacentHTML('beforeend', alertHTML);
    lastNameInput.style.borderColor = 'red';
    lastNamePass = false;
  } else {
    lastNamePass = true;
  }
  changeOrderBtnStatus()
})

//Validate Mobile Number
mobileInput.addEventListener('focus', ()=> {
  const mobileAlert = document.getElementById("mobile-alert")
  mobileAlert.innerHTML = "";
  mobileInput.style.borderColor = 'rgb(224, 220, 217)';
})

mobileInput.addEventListener('blur', () => {
  
  if ((mobileInput.value === '') || (mobileInput.value.length<9) || (isNaN(parseInt(mobileInput.value)) === true)) {
    const mobileAlert = document.getElementById("mobile-alert")
    const alertHTML = `<div class="alert-msg">&nbsp;Enter a valid mobile number</div>`
    mobileAlert.insertAdjacentHTML('beforeend', alertHTML);
    mobileInput.style.borderColor = 'red';
    mobilePass = false;
  } else {
    mobilePass = true;
  }
   changeOrderBtnStatus()
})


//Validate Email
let emailAddress = ""

function checkEmailPattern(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

emailInput.addEventListener('focus', ()=> {
  const emailAlert = document.getElementById("email-alert")
  emailAlert.innerHTML = "";
  emailInput.style.borderColor = 'rgb(224, 220, 217)';
})

emailInput.addEventListener('blur', () => {
  if ((emailInput.value === '') || (checkEmailPattern(emailInput.value) === false)) {
    const emailAlert = document.getElementById("email-alert")
    const alertHTML = `<div class="alert-msg">&nbsp;Enter a valid email</div>`
    emailAlert.insertAdjacentHTML('beforeend', alertHTML);
    emailInput.style.borderColor = 'red';
    emailPass = false;
  } else {
    emailPass = true;
    emailAddress = emailInput.value
    localStorage.setItem('email', emailAddress)
  }
   changeOrderBtnStatus()
})


//Validate Street
streetInput.addEventListener('focus', ()=> {
  const streetAlert = document.getElementById("street-alert")
  streetAlert.innerHTML = "";
  streetInput.style.borderColor = 'rgb(224, 220, 217)';
})

streetInput.addEventListener('blur', ()=> {
  if (streetInput.value === '') {
    const streetAlert = document.getElementById("street-alert")
    const alertHTML = `<div class="alert-msg">&nbsp;Enter an address</div>`
    streetAlert.insertAdjacentHTML('beforeend', alertHTML);
    streetInput.style.borderColor = 'red';
    streetPass = false;
  } else {
    streetPass = true;
  }
  changeOrderBtnStatus()
})

//Validate City
cityInput.addEventListener('focus', ()=> {
  const cityAlert = document.getElementById("city-alert")
  cityAlert.innerHTML = "";
  cityInput.style.borderColor = 'rgb(224, 220, 217)';
})

cityInput.addEventListener('blur', ()=> {
  if (cityInput.value === '') {
    const cityAlert = document.getElementById("city-alert")
    const alertHTML = `<div class="alert-msg">&nbsp;Enter a city/suburb</div>`
    cityAlert.insertAdjacentHTML('beforeend', alertHTML);
    cityInput.style.borderColor = 'red';
    cityPass = false;
  } else {
    cityPass = true;
  }
  changeOrderBtnStatus()
})
