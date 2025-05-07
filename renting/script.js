// Hamburger menu for mobile
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

hamburger.addEventListener('click', () => {
    mobileMenu.style.display = mobileMenu.style.display === 'flex' ? 'none' : 'flex';
});

// Login/Signup toggle and validation
const showLogin = document.getElementById('showLogin');
const showSignup = document.getElementById('showSignup');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const loginMessage = document.getElementById('loginMessage');
const signupMessage = document.getElementById('signupMessage');

if (showLogin && showSignup && loginForm && signupForm) {
  showLogin.addEventListener('click', () => {
    showLogin.classList.add('active');
    showSignup.classList.remove('active');
    loginForm.classList.remove('hidden');
    signupForm.classList.add('hidden');
    loginMessage.textContent = '';
    signupMessage.textContent = '';
  });

  showSignup.addEventListener('click', () => {
    showSignup.classList.add('active');
   showLogin.classList.remove('active');
    signupForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    loginMessage.textContent = '';
    signupMessage.textContent = '';
  });

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simple validation
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;
    if (email === "" || pass === "") {
      loginMessage.textContent = "Please fill all fields.";
    } else {
      loginMessage.textContent = "Login successful! (Demo)";
      // Redirect or further logic here
    }
  });

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const pass = document.getElementById('signupPassword').value;
    if (name === "" || email === "" || pass === "") {
      signupMessage.textContent = "Please fill all fields.";
    } else if (pass.length < 6) {
      signupMessage.textContent = "Password must be at least 6 characters.";
    } else {
      signupMessage.textContent = "Signup successful! (Demo)";
      // Redirect or further logic here
    }
  });
}

// Password Visibility Toggle
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

if (togglePassword && password) {
    togglePassword.addEventListener('click', () => {
        const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
        password.setAttribute('type', type);
        togglePassword.classList.toggle('fa-eye');
        togglePassword.classList.toggle('fa-eye-slash');
    });
}

// Product Card Hover Effect
const productCards = document.querySelectorAll('.product-card');
productCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-5px)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Search and Filter Functionality
const searchInput = document.querySelector('.search-filter input');
const categorySelect = document.querySelector('.search-filter select:first-of-type');
const sortSelect = document.querySelector('.search-filter select:last-of-type');

if (searchInput && categorySelect && sortSelect) {
    searchInput.addEventListener('input', filterProducts);
    categorySelect.addEventListener('change', filterProducts);
    sortSelect.addEventListener('change', sortProducts);
}

function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const category = categorySelect.value;
    const products = document.querySelectorAll('.product-card');

    products.forEach(product => {
        const title = product.querySelector('h3').textContent.toLowerCase();
        const productCategory = product.getAttribute('data-category');
        
        const matchesSearch = title.includes(searchTerm);
        const matchesCategory = !category || productCategory === category;

        product.style.display = matchesSearch && matchesCategory ? 'block' : 'none';
    });
}

function sortProducts() {
    const sortBy = sortSelect.value;
    const productGrid = document.querySelector('.product-grid');
    const products = Array.from(productGrid.querySelectorAll('.product-card'));

    products.sort((a, b) => {
        const priceA = parseFloat(a.querySelector('p').textContent.replace(/[^0-9.]/g, ''));
        const priceB = parseFloat(b.querySelector('p').textContent.replace(/[^0-9.]/g, ''));

        switch (sortBy) {
            case 'price-low':
                return priceA - priceB;
            case 'price-high':
                return priceB - priceA;
            default:
                return 0;
        }
    });

    products.forEach(product => productGrid.appendChild(product));
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add to Cart/Rent Functionality
const rentButtons = document.querySelectorAll('.rent-btn');
rentButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const productCard = button.closest('.product-card');
        const productName = productCard.querySelector('h3').textContent;
        const productPrice = productCard.querySelector('p').textContent;

        // Here you would typically add the item to a cart or initiate a rental process
        alert(`Added ${productName} to your cart! Price: ${productPrice}`);
    });
});

// Responsive Navigation
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        mobileMenu.style.display = 'none';
    }
});

// Form Input Validation
const formInputs = document.querySelectorAll('input[required]');
formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.style.borderColor = '#ff4d6d';
        } else {
            input.style.borderColor = '#ddd';
        }
    });
});

// Key event listener for 'R' key to show a special offer
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'r') {
        // Create a new element for special offer
        const specialOffer = document.createElement('div');
        specialOffer.className = 'special-offer';
        specialOffer.innerHTML = `
            <h3> Special Offer! </h3>
            <p>Get 20% off on your first rental!</p>
            <button onclick="this.parentElement.remove()">Close</button>
        `;
        
        // Add styles to the element
        specialOffer.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #ff4d6d;
            color: white;
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 1000;
        `;
        
        // Add button styles
        specialOffer.querySelector('button').style.cssText = `
            background: white;
            color: #ff4d6d;
            border: none;
            padding: 8px 20px;
            border-radius: 5px;
            margin-top: 10px;
            cursor: pointer;
            font-weight: bold;
        `;
        
        // Add to the DOM
        document.body.appendChild(specialOffer);
    }
});
