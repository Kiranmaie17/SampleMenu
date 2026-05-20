
const menuItems = [
    {
        name: "Brocolli and SweetCorn Soup",
        price: 120,
        category: "Starters",
        image: "https://img.freepik.com/premium-photo/broccoli-sweetcorn-soup-high-resolution-phot_1114068-44314.jpg",
        description: "Boiled Sautaed brocolli and corn blended to soup.",
        isVeg: true
    },

    {
        name: "Paneer Tikka",
        price: 220,
        category: "Starters",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_EkTCany6ZRFsb0iu-3_q4Es3dASH40_2ipaL1WZaGon3v_8dhfOcWCCaS6OUXYq89XB37tYGWmfvtwT1us_SPyURwdVPm0FiS0LVDstE&s=10",
        description: "Smoky grilled paneer cubes with spices.",
        isVeg: true
    },

    {
        name: "Rumali Roti",
        price: 120,
        category: "Main Course",
        image: "https://static.toiimg.com/thumb/82220288.cms?resizemode=4&width=1200",
        description: "Soft smooth bread made on reversed tawa",
        isVeg: true
    },

    {
        name: "Butter Naan",
        price: 120,
        category: "Main Course",
        image: "https://www.munatycooking.com/wp-content/uploads/2016/10/butter-naan-without-yeast-2.jpg",
        description: "Soft smooth bread with butter and smokey flavor",
        isVeg: true
    },

    {
        name: "Chicken 65",
        price: 260,
        category: "Starters",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCrHTtC79tfhrEC9yY6cRGOcrIJ2-RdW5esHL95HimFX2hJjW_PNgFsPPNGxmSNeNrLqEJHEyc8fgClUPUkZIagX2v1Y_zlC2RMDDGpaK1KQ&s=10",
        description: "Spicy crispy chicken starter.",
        isVeg: false
    },
    {
        name: "Butter Chicken",
        price: 340,
        category: "Main Course",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW3LkflFN9_myi5U9U8N5Jn7-rVIAjmMNhZCvo9Y-E5PT71g52V4V69prYCLeFz7MGFHlnS9mRbE4e7yWOMBNqMrwAEtBqXMS0Sx-PzXk&s=10",
        description: "Creamy tomato based chicken curry.",
        isVeg: false
    },

    {
        name: "Paneer Butter Masala",
        price: 290,
        category: "Main Course",
        image: "https://t3.ftcdn.net/jpg/07/07/16/16/240_F_707161627_ZcREXZTdnUiXwfuDSpVsXhQPle51FhqE.jpg",
        description: "Rich paneer curry with butter gravy.",
        isVeg: true
    },

    {

        name: "Veg Biryani",
        price: 240,
        category: "Biryani",
        image: "https://i.ytimg.com/vi/URQDUEJHuOs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDTr37VRCd0IH7MnWYELYYblLq7jQ",
        description: "Aromatic rice cooked with vegetables.",
        isVeg: true
    },

    {

        name: "Ambur Chicken Biryani",
        price: 340,
        category: "Biryani",
        image: "https://palatesdesire.com/wp-content/uploads/2022/05/ambur-chicken-biryani-recipe@palates-desire.jpg",
        description: "Aromatic rice cooked with vegetables.",
        isVeg: false
    },

    {
        name: "Chicken Dum Biryani",
        price: 320,
        category: "Biryani",
        image: "https://images.pexels.com/photos/12737817/pexels-photo-12737817.jpeg",
        description: "Hyderabadi style chicken biryani.",
        isVeg: false
    },
    {
        name: "Gulab Jamun",
        price: 120,
        category: "Desserts",
        image: "https://images.pexels.com/photos/15014919/pexels-photo-15014919.jpeg",
        description: "Soft sweet dumplings in sugar syrup.",
        isVeg: true
    },
    {
        name: "Chocolate Brownie",
        price: 180,
        category: "Desserts",
        image: "https://images.pexels.com/photos/11762843/pexels-photo-11762843.jpeg",
        description: "Warm brownie served with choco sauce.",
        isVeg: true
    },
    {
        name: "Mango Lassi",
        price: 110,
        category: "Beverages",
        image: "https://images.pexels.com/photos/32647253/pexels-photo-32647253.jpeg",
        description: "Refreshing mango yogurt drink.",
        isVeg: true
    },
    {
        name: "Cold Coffee",
        price: 140,
        category: "Beverages",
        image: "https://images.pexels.com/photos/34541593/pexels-photo-34541593.jpeg",
        description: "Creamy chilled coffee drink.",
        isVeg: true
    },
    {
        name: "Fish Fry",
        price: 300,
        category: "Starters",
        image: "https://images.pexels.com/photos/30325818/pexels-photo-30325818.jpeg",
        description: "Crispy spicy fried fish slices.",
        isVeg: false
    },
    {
        name: "Veg Hakka Noodles",
        price: 210,
        category: "Main Course",
        image: "https://images.pexels.com/photos/12737804/pexels-photo-12737804.jpeg",
        description: "Stir fried noodles with vegetables.",
        isVeg: true
    }

];

const menuContainer = document.getElementById("menuContainer");
const filterButtons = document.querySelectorAll(".filter-btn");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

let cart = [];

function renderMenu(items) {
    menuContainer.innerHTML = "";
    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <div class="card-image" style="background-image:url('${item.image}')"></div>
            <div class="card-content">
                <div class="card-top">
                    <h3>${item.name}</h3>
                    <div class="${item.isVeg ? 'veg-dot' : 'nonveg-dot'}"></div>
                </div>
                <p class="description">${item.description}</p>
                <p class="price">₹${item.price}</p>
                <button class="add-btn">Add to Cart</button>
            </div>
        `;
        const button = card.querySelector(".add-btn");
        button.addEventListener("click", () => {
            addToCart(item);
            button.innerText = "Added!";
            setTimeout(() => {
                button.innerText = "Add to Cart";
            }, 1000);
       });
        menuContainer.appendChild(card);
    });

}
function addToCart(item) {
    const existingItem = cart.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }
    updateCart();
}

function updateCart() {
    let totalItems = 0;
    let totalPrice = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.quantity * item.price;
    });
    cartCount.innerText = totalItems;
    cartTotal.innerText = totalPrice;
}
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        button.classList.add("active");
        const category = button.dataset.category;
        if (category === "All") {
            renderMenu(menuItems);
        } else {
            const filteredItems = menuItems.filter(item => item.category === category);
            renderMenu(filteredItems);
        }
    });
});
renderMenu(menuItems);