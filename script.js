

    // Array of Products
const products = [
    {
      name: 'Sony Playstation 5',
      url: 'images/playstation_5.png',
      type: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung Galaxy',
      url: 'images/samsung_galaxy.png',
      type: 'smartphones',
      price: 399.99,
    },
    {
      name: 'Cannon EOS Camera',
      url: 'images/cannon_eos_camera.png',
      type: 'cameras',
      price: 749.99,
    },
    {
      name: 'Sony A7 Camera',
      url: 'images/sony_a7_camera.png',
      type: 'cameras',
      price: 1999.99,
    },
    {
      name: 'LG TV',
      url: 'images/lg_tv.png',
      type: 'televisions',
      price: 799.99,
    },
    {
      name: 'Nintendo Switch',
      url: 'images/nintendo_switch.png',
      type: 'games',
      price: 299.99,
    },
    {
      name: 'Xbox Series X',
      url: 'images/xbox_series_x.png',
      type: 'games',
      price: 499.99,
    },
    {
      name: 'Samsung TV',
      url: 'images/samsung_tv.png',
      type: 'televisions',
      price: 1099.99,
    },
    {
      name: 'Google Pixel',
      url: 'images/google_pixel.png',
      type: 'smartphones',
      price: 499.99,
    },
    {
      name: 'Sony ZV1F Camera',
      url: 'images/sony_zv1f_camera.png',
      type: 'cameras',
      price: 799.99,
    },
    {
      name: 'Toshiba TV',
      url: 'images/toshiba_tv.png',
      type: 'televisions',
      price: 499.99,
    },
    {
      name: 'iPhone 14',
      url: 'images/iphone_14.png',
      type: 'smartphones',
      price: 999.99,
    },
  ];
  

  // Get DOM elements
  const productWrapperEL = document.querySelector('#products-wrapper');
  const checkEls = document.querySelectorAll('.check');
  const filtersContainer = document.querySelectorAll('#filter-container');
  const searchInput = document.querySelector('#search');
  const cartButton = document.querySelector('#cartButton');
  const cartCount = document.querySelector('#cartCount');

  // Initialize cart item count
  let cartItemCount = 0;

  // Initialize products
  const productsEls = [];

  // Loop over the products and create product elements
  products.forEach((product) => {
    const productEl = createProductElement(product);
    productsEls.push(productEl)

    productWrapperEL.appendChild(productEl)
  });

  // Add filter event listeners
  filtersContainer.forEach((filter) => {
    filter.addEventListener('change', filterProducts)
  });
  searchInput.addEventListener('input', filterProducts);

  // Filter Products by search or checkbox
  function filterProducts(){
    // Get search term
    const searchTerm = searchInput.value.trim().toLowerCase();
    // Get checked categories
    const checkedCategories = Array.from(checkEls)
                                   .filter(check => check.checked)
                                   .map((check) => check.id);
                              
    // Loop over products and check for mathces
    productsEls.forEach((productElement, index) => {
      const product = products[index];

      // Check to see if product matches the search or checked items
      const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
      const isInCheckedCategory = checkedCategories.length === 0 || checkedCategories.includes(product.type)

      // Show or Hide product based on matches
      if(matchesSearchTerm && isInCheckedCategory){
        productElement.classList.remove('hidden');
      } else {
        productElement.classList.add('hidden');
      }
    })       
    
  }

  // Create product elements
  function createProductElement(product){
    const productEl = document.createElement('div');
    productEl.className = 'item space-y-2';

    productEl.innerHTML = `<div class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border">
                            <img src="${product.url}" alt="${product.name}" class="w-full h-full object-cover">
                            <span class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0">Add to Cart</span>
                          </div>

                          <p class="text-xl">${product.name}</p>
                          <strong>$${product.price.toLocaleString()}</strong>`;

    productEl.querySelector('.status').addEventListener('click', addToCart);                      

    return productEl;                       
  }

  // Toggle add/remove from cart
  function addToCart(event){
    const statusElement = event.target;

    // Check product's cart status
    if(statusElement.classList.contains('added')){
      // Remove from cart
      statusElement.classList.remove('added');
      statusElement.textContent = 'Add to Cart';

      // Change style
      statusElement.classList.add('bg-gray-800');
      statusElement.classList.remove('bg-red-800');

      //  Decrease count of items in the cart
      cartItemCount--;
    } else {
      // Add to cart
      statusElement.classList.add('added');
      statusElement.textContent = 'Remove from Cart';

      // Change style
      statusElement.classList.remove('bg-gray-800');
      statusElement.classList.add('bg-red-800');

      // Increase count of items in the cart
      cartItemCount++;
    }

    // Update cart item count
    cartCount.innerText = cartItemCount.toString();
    
  }

