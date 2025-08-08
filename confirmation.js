//Pass the email address to this page
const emailConfirmContainer = document.getElementById("confirm-email");

let emailConfirm = localStorage.getItem('email');
console.log(emailConfirm);

const emailHTML = `<div>${emailConfirm}</div>`
emailConfirmContainer.insertAdjacentHTML('beforeend', emailHTML)
