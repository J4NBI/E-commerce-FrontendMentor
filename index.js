const btnMinus = document.querySelector(".btn-minus");
const btnPlus = document.querySelector(".btn-plus");
const btnAdd = document.querySelector(".btn-add");
const quantity = document.querySelector(".quantity");
const btnMenue = document.querySelector(".btn-menue");
const btnClose = document.querySelector(".btn-close");
const menue = document.querySelector(".menue");
const basketCount = document.querySelector(".basketCount");
const quantityBasket = document.querySelector(".quantity-basket");
const btnBasketMinus = document.querySelector(".btn-basket-minus");
const btnBasketPlus = document.querySelector(".btn-basket-plus");
const productPrice = document.querySelector(".product-price");
const checkout = document.querySelector(".checkout");
const basketCard = document.querySelector(".basket-card");
const shoppingBasket = document.querySelector("#shopping-basket");

const preBtn = document.querySelector(".pre-btn");
const nextBtn = document.querySelector(".next-btn");

const thumbnails = document.querySelectorAll(".thumbnail");
const fullImage = document.querySelector(".fullImage");

// Change Thumbnail visibility
function changeThumbnail() {
  setTimeout(() => {
    const currentImage = fullImage.src;

    const currentImageId = Number(
      currentImage.match(/image-product-(\d+)\.jpg$/)[1]
    );

    thumbnails.forEach((thumb) => thumb.classList.remove("opacity-20"));

    thumbnails[currentImageId - 1].classList.add("opacity-20");
    fullImage.classList.add("fadeIn");
  }, 100);
}

// Previous Button
preBtn.addEventListener("click", () => {
  fullImage.classList.add("fadeOut");
  setTimeout(() => {
    const currentImage = fullImage.src;
    const currentImageId = Number(currentImage.at(-5));
    const nextImageId = currentImageId - 1;
    if (nextImageId === 0) {
      fullImage.src = `./images/image-product-4.jpg`;
    } else {
      fullImage.src = `./images/image-product-${nextImageId}.jpg`;
    }

    fullImage.classList.remove("fadeOut");
    fullImage.classList.add("fadeIn");
    changeThumbnail();
  }, 500);
});

// Next Button
nextBtn.addEventListener("click", () => {
  fullImage.classList.add("fadeOut");
  setTimeout(() => {
    const currentImage = fullImage.src;
    const currentImageId = Number(currentImage.at(-5));
    const nextImageId = currentImageId + 1;
    if (nextImageId === 5) {
      fullImage.src = `./images/image-product-1.jpg`;
    } else {
      fullImage.src = `./images/image-product-${nextImageId}.jpg`;
    }

    fullImage.classList.remove("fadeOut");
    fullImage.classList.add("fadeIn");
    changeThumbnail();
  }, 500);
});

// Eventlistener for Thumbnails
thumbnails.forEach((t) => {
  t.addEventListener("click", (e) => {
    console.log(e.currentTarget.id);
    const currentId = e.currentTarget.id;
    fullImage.src = `./images/image-product-${currentId}.jpg`;
    changeThumbnail();
  });
});

let quantityNumber = 0;

// Remove class in/out for nav menue on width 786
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    menue.classList.remove("in", "out");
    menue.classList.remove("hidden"); // Desktop: immer sichtbar
  } else {
    menue.classList.add("hidden"); // Mobile: standardmäßig versteckt
  }
});

// Button minus
btnMinus.addEventListener("click", () => {
  if (quantityNumber === 0) return;
  quantityNumber--;
  quantity.innerHTML = quantityNumber;
});

// Button plus
btnPlus.addEventListener("click", () => {
  quantityNumber++;
  quantity.innerHTML = quantityNumber;
});

// Button Menue (Burger)
btnMenue.addEventListener("click", () => {
  btnClose.classList.remove("hidden");
  menue.classList.remove("out");
  menue.classList.add("in");
  menue.classList.remove("hidden");
});

// Button Menue Close
btnClose.addEventListener("click", () => {
  menue.classList.remove("in");
  menue.classList.add("out");
});

// Button add to basketCount

btnAdd.addEventListener("click", () => {
  setBasket();
});

// basketCount
let basket = 0;

getBasket();
// Get basket
function getBasket() {
  const savedBasket = localStorage.getItem("basket");
  if (savedBasket) {
    basket = Number(savedBasket);
    basketCount.innerHTML = basket;
    quantityBasket.innerHTML = basket;
    productPrice.innerHTML = `$${basket * 125}`;
  }
}

// Set Basket
function setBasket() {
  basket = basket + Number(quantity.innerHTML);
  quantity.innerHTML = "0";
  quantityNumber = 0;
  localStorage.setItem("basket", basket);
  getBasket();
}

// BasketCard

btnBasketMinus.addEventListener("click", () => {
  if (basket === 0) return;
  basket--;
  setBasket();
});

btnBasketPlus.addEventListener("click", () => {
  basket++;
  setBasket();
});

checkout.addEventListener("click", () => {
  basketCard.classList.remove("basket-in");
  basketCard.classList.add("basket-out");
  setTimeout(() => {
    basketCard.classList.toggle("hidden");
    basket = 0;
    setBasket();
  }, 1000);
});

shoppingBasket.addEventListener("click", () => {
  basketCard.classList.toggle("basket-in");
  basketCard.classList.toggle("basket-out");
  if (basketCard.classList.contains("hidden")) {
    setTimeout(() => {
      basketCard.classList.toggle("hidden");
    }, 200);
  } else {
    setTimeout(() => {
      basketCard.classList.toggle("hidden");
    }, 1000);
  }
});
