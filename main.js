// Shopping Cart Implementation
let cart = [];
let cartIcon = document.querySelector('.bx-shopping-bag');
let cartCount = document.createElement('span');
cartCount.className = 'cart-count';
cartCount.textContent = '0';
cartIcon.parentNode.appendChild(cartCount);

// Add to cart functionality
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('bx-shopping-bag') && e.target.closest('.product-info')) {
    e.preventDefault();
    let productBox = e.target.closest('.product-box');
    let productName = productBox.querySelector('h2').textContent;
    let productPrice = productBox.querySelector('span').textContent;
    let productImg = productBox.querySelector('img').src;
    
    // Check if product already in cart
    let existingItem = cart.find(item => item.name === productName);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        name: productName,
        price: productPrice,
        img: productImg,
        quantity: 1
      });
    }
    
    updateCartCount();
    // You can add a notification here
    alert(`${productName} added to cart!`);
  }
  
  // Open cart when clicking cart icon in nav
  if (e.target.classList.contains('bx-shopping-bag') && e.target.closest('.nav-icons')) {
    e.preventDefault();
    showCartModal();
  }
});

function updateCartCount() {
  let total = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = total;
}

function showCartModal() {
  // Create modal HTML
  let modalHTML = `
    <div class="cart-modal">
      <div class="cart-content">
        <h2>Your Cart</h2>
        <div class="cart-items">
          ${cart.length > 0 ? 
            cart.map(item => `
              <div class="cart-item">
                <img src="${item.img}" alt="${item.name}" width="50">
                <div>
                  <h3>${item.name}</h3>
                  <p>${item.price} × ${item.quantity}</p>
                </div>
                <button class="remove-item" data-name="${item.name}">×</button>
              </div>
            `).join('') : 
            '<p>Your cart is empty</p>'}
        </div>
        <div class="cart-total">
          Total: $${cart.reduce((sum, item) => sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0).toFixed(2)}
        </div>
        <button class="checkout-btn">Checkout</button>
        <button class="close-cart">Close</button>
      </div>
    </div>
  `;
  
  // Add modal to body
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Add event listeners
  document.querySelector('.close-cart').addEventListener('click', () => {
    document.querySelector('.cart-modal').remove();
  });
  
  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
      let itemName = this.getAttribute('data-name');
      cart = cart.filter(item => item.name !== itemName);
      updateCartCount();
      showCartModal(); // Refresh modal
    });
  });
  
  document.querySelector('.checkout-btn').addEventListener('click', function() {
    alert('Checkout functionality would be implemented here!');
  });
}

// Enhanced Search Functionality
document.querySelector('#search-icon').onclick = (e) => {
    e.preventDefault();
    search.classList.toggle('active');
    if (search.classList.contains('active')) {
        document.querySelector('.search-box input').focus();
    }
};

// Search functionality
document.querySelector('.search-box input').addEventListener('input', function() {
    let searchTerm = this.value.toLowerCase();
    
    // For demo purposes - in a real site you would search your products
    if (searchTerm.length > 2) {
        // This would be replaced with actual search logic
        console.log(`Searching for: ${searchTerm}`);
        // In a real implementation, you would filter products and display results
    }
});

// Close search when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-box') && !e.target.closest('#search-icon')) {
        search.classList.remove('active');
    }
});
var swiper = new Swiper(".mySwiper", {
      spaceBetween: 30,
      centeredSlides: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });

let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.navbar');
let search = document.querySelector('.search-box');

menu.onclick = () => {
  menu.classList.toggle("move");
  navbar.classList.toggle("open-menu");
};

window.onscroll = () => {
  menu.classList.remove("move");
  navbar.classList.remove("open-menu");
};

const animate = ScrollReveal({
  origin: "top",
  distance: "60px",
  duration: "2500",
  delay: "400",
});

animate.reveal(".nav");
animate.reveal(".home-text", { origin: "left" });
animate.reveal(".home-img", { origin: "bottom" });
animate.reveal(".ser-box, .product-box, .team-box, .book-data", {
  interval: 100,
});

document.querySelector('#search-icon').onclick = () =>{
    search.classList.toggle('active');
};
