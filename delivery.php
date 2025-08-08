<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tasty Grocery</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <a href="index.php" id="logo-button">
      <img src="img/Tasty.png" alt="Logo">
    </a>
  </header>
  <div class="border-title">
    <div class="delivery-title">
      delivery information
    </div>
  </div>
  <div class="form-container">
    <div id="delivery-info-form">
      <div id="info-recipient">
        <div class="delivery-subtitle">
          Contact
        </div>
        <div class="name-input-container">
          <div id="first-name-block" class="input-vertical">
            <div class="sub-sub-title">First Name</div>
            <input type="text" placeholder="&nbsp;First Name" name="first-name" id="first-name-input">
            <div id="first-name-alert"></div>
          </div>
          <div id="last-name-block" class="input-vertical">
            <div class="sub-sub-title">Last Name</div>
            <input type="text" placeholder="&nbsp;Last Name" name="last-name" id="last-name-input">
            <div id="last-name-alert"></div>
          </div>
        </div>
        <div id="mobile-number-input-container" class="input-vertical">
          <div class="sub-sub-title">Mobile Number</div>
          <input type="text" placeholder="&nbsp;Mobile Number" name="mobile-number" id="mobile-input">
          <div id="mobile-alert"></div>
        </div>
        <div id="email-input-container" class="input-vertical">
          <div class="sub-sub-title">Email Address</div>
          <input id="email-input" type="text" placeholder="&nbsp;Email">
          <div id="email-alert"></div>
        </div>
      </div>
      <div id="info-address">
        <div class="delivery-subtitle">
          Address
        </div>
        <div id="street-container" class="input-vertical">
          <div class="sub-sub-title">Street</div>
          <input type="text" placeholder="&nbsp;Street" name="street" id="address-input">
          <div id="street-alert"></div>
        </div>
        <div class="more-address-container">
          <div id="city-block" class="input-vertical">
            <div class="sub-sub-title">City/Suburb</div>
            <input type="text" placeholder="&nbsp;City/Suburb" name="city-or-suburb" id="city-input">
            <div id="city-alert"></div>
          </div>
          <div id="state-block" class="input-vertical">
            <div class="sub-sub-title">State</div>
            <select id="state-option" name="state">
              <option>NSW</option>
              <option>VIC</option>
              <option>QLD</option>
              <option>WA</option>
              <option>SA</option>
              <option>TAS</option>
              <option>ACT</option>
              <option>NT</option>
              <option>Others</option>
            </select>
          </div>
        </div>
      </div>
      <div id="validation"></div>
      <div class="order-container">
        <button id="takeBackBtn" class="continue-shopping-btn" onclick="window.location.href='index.php'">
          Continue Shopping
        </button>
        <button id="place-order-btn">
          Place Order
        </button>
      </div>
    </div>
  </div>

  <script src="delivery.js"></script>
</body>
</html>