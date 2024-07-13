document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu ul li a');

    // Toggle menu for mobile view
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Section navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            sections.forEach(section => {
                if (section.id === targetId) {
                    section.classList.add('active');
                } else {
                    section.classList.remove('active');
                }
            });
            navMenu.classList.remove('active'); // Close menu after selection in mobile view
        });
    });

    // Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const checkoutButton = document.querySelector('.checkout');

    class Cart {
        constructor() {
            this.items = [];
            this.totalPrice = 0;
        }

        addItem(name, price) {
            this.items.push({ name, price });
            this.totalPrice += price;
            this.updateCart();
        }

        updateCart() {
            cartItemsContainer.innerHTML = '';
            this.items.forEach(item => {
                const li = document.createElement('li');
                li.textContent = `${item.name} - $${item.price.toFixed(2)}`;
                cartItemsContainer.appendChild(li);
            });
            totalPriceElement.textContent = this.totalPrice.toFixed(2);
        }

        checkout() {
            alert(`Your total is $${this.totalPrice.toFixed(2)}. Thank you for your purchase!`);
            this.items = [];
            this.totalPrice = 0;
            this.updateCart();
        }
    }

    const cart = new Cart();

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.parentElement;
            const name = product.querySelector('span').textContent.split(' - ')[0];
            const price = parseFloat(product.getAttribute('data-price'));
            cart.addItem(name, price);
        });
    });

    checkoutButton.addEventListener('click', () => {
        cart.checkout();
    });
});