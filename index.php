<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tasty Grocery</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header>
    <a href="index.php" id="logo-button">
      <img src="img/Tasty.png" alt="Logo">
    </a>
    <div id="search-box"> 
      <form method="GET">
        <input type="text" placeholder="&nbsp;&nbsp;Search products" name="search">
        <button>
          <img src="img/search.png" alt="search icon">
        </button>
      </form>
    </div>
    <button id="cart-btn">
      <img src="img/cart.png" alt="cart icon">
    </button>
  </header>
  <div id="nav-bar">
    <div class="catogory">
      <a href="index.php?category=fresh">Fresh</a>
      <div class="sub-cat">
        <a href="index.php?category=fresh&subtype=fruits">Fruits</a>
        <a href="index.php?category=fresh&subtype=vegetables">Vegetables</a>
      </div>
    </div>
    <div class="catogory">
      <a href="index.php?category=diary">Diary</a>
      <div class="sub-cat">
        <a href="index.php?category=diary&subtype=milk">Milk</a>
        <a href="index.php?category=diary&subtype=yogurt">Yogurt</a>
      </div>
    </div>
    <div class="catogory">
      <a href="index.php?category=beverages">Beverages</a>
      <div class="sub-cat">
        <a href="index.php?category=beverages&subtype=water">Water</a>
        <a href="index.php?category=beverages&subtype=soda">Soda</a>
      </div>
    </div>
    <div class="catogory">
      <a href="index.php?category=snacks">Snacks</a>
      <div class="sub-cat">
        <a href="index.php?category=snacks&subtype=cookies">Cookies</a>
        <a href="index.php?category=snacks&subtype=chips">Chips</a>
      </div>
    </div>
    <div class="catogory">
      <a href="index.php?category=home">Home</a>
      <div class="sub-cat">
        <a href="index.php?category=home&subtype=dining">Dining</a>
        <a href="index.php?category=home&subtype=bath">Bath</a>
      </div>
    </div>
  </div>
  
  <div id="grid-container">
    <?php include 'loadItem.php'; ?>
  </div>

  <div id="cart-page">
    <div class="cart-page-left"></div>
    <div class="cart-page-right">
      <div class="cart-top">
        <div class="cart-title">Shopping Cart</div>
        <button id="cart-close-btn">X</button>
      </div>
      <div class="cart-content">
        
        <div id="cart-item-list"></div>
        
        <div class="remove-all-container">
          <button id="remove-all-btn">
            Remove all
          </button>
        </div>
      </div>
      <div class="cart-total-price-container">
        <div class="cart-total-price-text">Total: &nbsp;&nbsp;$</div>
        <div id="cart-total-price"></div>
      </div>
      <div class="cart-bottom">
        <button id="check-out-btn">
          Check Out
        </button>
      </div>
    </div>
  </div>

  <script src="main.js"></script>
</body>
</html>