//copy menu for mobile
function copyMenu() {
    //copy inside .dpt-cat to .departments
    var dptCategory = document.querySelector('.dpt-cart');
    var dptPlace = document.querySelector('.departments');
    dptPlace.innerHTML = dptCategory.innerHTML;

    //copy inside nav nav
    var mainNav = document.querySelector('.header-nav nav');
    var navPlace = document.querySelector('.off-canvas nav')
    navPlace.innerHTML = mainNav.innerHTML;

    //copy .header-top .wrapper to .thetop-nav
    var topNav = document.querySelector('.header-top .wrapper');
    var topPlace = document.querySelector('.off-canvas .thetop-nav')
    topPlace.innerHTML = topNav.innerHTML;
}
copyMenu();

//show mobile menu
const menuButton = document.querySelector('.trigger'),
      closeButton = document.querySelector('.t-close'),
      addclass = document.querySelector('.site');
menuButton.addEventListener('click', function() {
    addclass.classList.toggle('showmenu')
})
closeButton.addEventListener('click', function() {
    addclass.classList.remove('showmenu')
})

//show submenu on mobile
const submenu = document.querySelectorAll('.has-child .icon-small');
submenu.forEach((menu) => menu.addEventListener('click', toggle));

function toggle(e) {
    e.preventDefault();
    submenu.forEach((item) => item != this ? item.closest('.has-child').classList.remove('expand') : null);
    if (this.closest('.has-child').classList != 'expand');
    this.closest('.has-child').classList.toggle('expand')
}

//slider
const swiper = new Swiper('.swiper', {
    loop: true,
  
    pagination: {
      el: '.swiper-pagination',
    },
  });

//show search
const searchButton = document.querySelector('.t-search'),
      tclose = document.querySelector('.search-close'),
      showClass = document.querySelector('.site');
searchButton.addEventListener('click', function() {
    showClass.classList.toggle('showsearch')
})
tclose.addEventListener('click', function() {
    showClass.classList.remove('showsearch')
});

//show dpt menu
const dptButton = document.querySelector('.dpt-cat .dpt-trigger'),
      dptClass = document.querySelector('.site');
dptButton.addEventListener('click', function() {
    dptClass.classList.toggle('showdpt')
});

//product image slide
var productThumb = new Swiper ('.small-image', {
    loop: true,
    spaceBetween: 10,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
        481: {
            spaceBetween: 32,
        }
    }
    });
var productBig = new Swiper ('.big-image', {
    loop: true,
    autoHeight: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    tumbs: {
        swiper: productThumb
    }
})

//stock product width percentage
var stocks = document.querySelectorAll('.products .stock');
for (let X = 0; x < stocks.length; x++) {
    let stock = stocks[x].dataset.stock,
    available = stocks[x].querySelector('.qty-available').innerHTML,
    sold = stocks[x].querySelector('.qty-sold').innerHTML,
    percent = sold *100/stock;
    stocks[x].querySelector('.available').Style.width = percent + '%';
}



document.addEventListener('DOMContentLoaded', function() {
    initializeEmptyCart();
    
    // Use event delegation for add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn.primary-button')) {
            e.preventDefault();
            addProductToCart(e.target.closest('.btn.primary-button'));
        }
        
        // Handle remove buttons
        if (e.target.closest('.remove-btn')) {
            e.preventDefault();
            const item = e.target.closest('.item');
            item.remove();
            checkIfCartIsEmpty();
            updateCartTotals();
        }
    });
});

function initializeEmptyCart() {
    // Set initial values
    document.querySelector('.fly-item .item-number').textContent = '0';
    document.querySelector('.cart-total').textContent = '$0.00';
    const subtotal = document.querySelector('.subtotal strong');
    if (subtotal) {
        subtotal.textContent = '$0.00';
    }
    
    // Ensure empty message exists
    const miniCartItems = document.querySelector('.mini-cart .cart-body ul');
    if (miniCartItems && !miniCartItems.querySelector('.empty-cart-message')) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.textContent = 'Your cart is empty';
        miniCartItems.appendChild(emptyMessage);
    }
}

function addProductToCart(button) {
    const item = button.closest('.item');
    if (!item) return;
    
    const product = {
        name: item.querySelector('.main-links a')?.textContent || 'Unknown Product',
        price: item.querySelector('.price .current')?.textContent || '$0.00',
        image: item.querySelector('.thumbnail img')?.src || '',
        quantity: 1
    };
    
    addToMiniCart(product);
    updateCartTotals();
}

function addToMiniCart(product) {
    const miniCartItems = document.querySelector('.mini-cart .cart-body ul');
    if (!miniCartItems) return;
    
    // Remove empty message if it exists
    const emptyMessage = miniCartItems.querySelector('.empty-cart-message');
    if (emptyMessage) {
        emptyMessage.remove();
    }
    
    // Create new cart item
    const cartItem = document.createElement('li');
    cartItem.className = 'item flexitem';
    cartItem.innerHTML = `
        <div class="thumbnail object-cover">
            <a href="#"><img src="${product.image}" alt="${product.name}"></a>
        </div>
        <div class="content">
            <h4><a href="#">${product.name}</a></h4>
            <ul class="price-content">
                <li class="price">${product.price}</li>
                <li class="qty">Qty: ${product.quantity}</li>
            </ul>
        </div>
        <div class="remove">
            <a href="#" class="remove-btn"><i class="ri-close-line"></i></a>
        </div>
    `;
    
    // Add item to cart
    miniCartItems.appendChild(cartItem);
}

function updateCartTotals() {
    const items = document.querySelectorAll('.mini-cart .item');
    const itemCount = items.length;
    const itemNumber = document.querySelector('.fly-item .item-number');
    const cartTotalElement = document.querySelector('.cart-total');
    const subtotalElement = document.querySelector('.subtotal strong');
    
    if (itemNumber) itemNumber.textContent = itemCount;
    
    let total = 0;
    items.forEach(item => {
        const priceText = item.querySelector('.price')?.textContent || '0';
        const price = parseFloat(priceText.replace(/[^\d.-]/g, '')) || 0;
        total += price;
    });
    
    if (cartTotalElement) cartTotalElement.textContent = `$${total.toFixed(2)}`;
    if (subtotalElement) subtotalElement.textContent = `$${total.toFixed(2)}`;
}

function checkIfCartIsEmpty() {
    const miniCartItems = document.querySelector('.mini-cart .cart-body ul');
    if (!miniCartItems) return;
    
    const items = miniCartItems.querySelectorAll('.item');
    if (items.length === 0) {
        const emptyMessage = document.createElement('li');
        emptyMessage.className = 'empty-cart-message';
        emptyMessage.textContent = 'Your cart is empty';
        miniCartItems.appendChild(emptyMessage);
        
        // Reset totals
        const itemNumber = document.querySelector('.fly-item .item-number');
        const cartTotalElement = document.querySelector('.cart-total');
        const subtotalElement = document.querySelector('.subtotal strong');
        
        if (itemNumber) itemNumber.textContent = '0';
        if (cartTotalElement) cartTotalElement.textContent = '$0.00';
        if (subtotalElement) subtotalElement.textContent = '$0.00';
    }
}





















//sow cart on click
const divtoShow = '.mini-cart';
const divPopup = document.querySelector(divtoShow);
const divTrigger = document.querySelector('.cart-trigger');

divTrigger.addEventListener('click', () => {
    setTimeout(() => {
        if(!divPopup.classList.contains('show')) {
            divPopup.classList.add('show')
        }
    }, 250 )
})

//close by click outside
document.addEventListener('click', (e) => {
    const isClosest = e.target.closest(divtoShow);
    if(!isClosest && divPopup.classList.contains('show')) {
        divPopup.classList.remove('show')
    }
})


window.onload = function () {
    document.getElementById('modal').classList.add('showmodal');
}

document.querySelector('.modalclose').addEventListener('click', function() {
    document.getElementById('modal').classList.remove('showmodal');
});























