const galleryImages = [
  {
    src: "assets/gallery/image1.jpg",
    alt: "Thumbnail Image 1",
  },
  {
    src: "assets/gallery/image2.jpg",
    alt: "Thumbnail Image 2",
  },
  {
    src: "assets/gallery/image3.jpg",
    alt: "Thumbnail Image 3",
  },
];

const productArray = [
  {
    title: "AstroFiction",
    author: "John Doe",
    price: 49.9,
    image: "./assets/products/img6.png",
  },
  {
    title: "Space Odissey",
    author: "Marie Anne",
    price: 35,
    image: "./assets/products/img1.png",
  },
  {
    title: "Doomed City",
    author: "Jason Cobert",
    price: 0,
    image: "./assets/products/img2.png",
  },
  {
    title: "Black Dog",
    author: "John Doe",
    price: 85.35,
    image: "./assets/products/img3.png",
  },
  {
    title: "My Little Robot",
    author: "Pedro Paulo",
    price: 0,
    image: "./assets/products/img5.png",
  },
  {
    title: "Garden Girl",
    author: "Ankit Patel",
    price: 45,
    image: "./assets/products/img4.png",
  },
];

// Menu Section
function menuEvent() {
  document
    .querySelector("#open-nav-menu")
    .addEventListener("click", function () {
      document.querySelector("header nav .wrapper").classList.add("nav-open");
    });

  document
    .querySelector("#close-nav-menu")
    .addEventListener("click", function () {
      document
        .querySelector("header nav .wrapper")
        .classList.remove("nav-open");
    });
}

// Greeting Section

function celsiusToFahr(temp) {
  let fahr = (temp * 9) / 5 + 32;
  return fahr;
}

function greetingEvent() {
  let greetingText;
  let time = new Date().getHours();

  if (time < 12) {
    greetingText = "Good Morning";
  } else if (time < 17) {
    greetingText = "Good Afternoon";
  } else if (time < 24) {
    greetingText = "Good Evening";
  } else {
    greetingText = "Welcome";
  }

  let weatherCondtion = "Sunny";
  let userLocation = "New York";
  let temperature = 22.8673;

  let celsiusText = `The weather is ${weatherCondtion} in ${userLocation} and it's ${temperature.toFixed(
    1
  )}C outside.`;
  let fahrText = `The weather is ${weatherCondtion} in ${userLocation} and it's ${celsiusToFahr(
    temperature
  ).toFixed(1)}F outside.`;

  document.querySelector("#greeting").innerHTML = greetingText;
  document.querySelector("p#weather").innerHTML = celsiusText;

  document
    .querySelector(".weather-group")
    .addEventListener("click", function (e) {
      let temp = e.target.id;
      if (temp == "fahr") {
        document.querySelector("p#weather").innerHTML = fahrText;
      } else if (temp == "celsius") {
        document.querySelector("p#weather").innerHTML = celsiusText;
      }
    });
}

// Time Section

function timeEvent() {
  setInterval(function () {
    let localDate = new Date();
    document.querySelector("span[data-time=hours]").textContent = localDate
      .getHours()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=minutes]").textContent = localDate
      .getMinutes()
      .toString()
      .padStart(2, "0");
    document.querySelector("span[data-time=seconds]").textContent = localDate
      .getSeconds()
      .toString()
      .padStart(2, "0");
  }, 1000);
}

// Section Gallary

function galleryEvent() {
  let mainImage = document.querySelector("#gallery > img");
  mainImage.src = galleryImages[0].src;
  mainImage.alt = galleryImages[0].alt;

  let thumbnail = document.querySelector("#gallery .thumbnails");

  galleryImages.forEach(function (image, index) {
    let thumb = document.createElement("img");
    thumb.src = image.src;
    thumb.alt = image.alt;
    thumb.dataset.arrayIndex = index;
    thumb.dataset.selected = index === 0 ? true : false;

    thumb.addEventListener("click", function (e) {
      let selectedIndex = e.target.dataset.arrayIndex;
      let selectedImage = galleryImages[selectedIndex];
      mainImage.src = selectedImage.src;
      mainImage.alt = selectedImage.alt;

      thumbnail.querySelectorAll("img").forEach(function (img) {
        img.dataset.selected = false;
      });

      e.target.dataset.selected = true;
    });

    thumbnail.appendChild(thumb);
  });
}

// Section Product

function productList(productArr) {
  let productArea = document.querySelector(".products-area");
  productArea.textContent = "";

  productArr.forEach(function (product) {
    // Create First Div and Add Class
    let productItem = document.createElement("div");
    productItem.classList.add("product-item");

    productArea.appendChild(productItem);

    // Create Image
    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.alt = product.title;

    productItem.appendChild(productImage);

    // Create Child Div
    let productDetails = document.createElement("div");
    productDetails.classList.add("product-details");

    productItem.appendChild(productDetails);

    // Create info
    let productTitle = document.createElement("h3");
    productTitle.classList.add("product-title");
    productTitle.textContent = product.title;
    productDetails.appendChild(productTitle);

    let productAuthor = document.createElement("p");
    productAuthor.classList.add("product-author");
    productAuthor.textContent = product.author;
    productDetails.appendChild(productAuthor);

    let priceTitle = document.createElement("p");
    productTitle.classList.add("price-title");
    productTitle.textContent = product.title;
    productDetails.appendChild(productTitle);

    let productPrice = document.createElement("p");
    productPrice.classList.add("product-title");
    productPrice.textContent =
      product.price > 0 ? product.price.toFixed(2) : "Free";
    productDetails.appendChild(productPrice);
  });
}

function productEvent() {
  productList(productArray);

  let paidProduct = productArray.filter(function (item) {
    return item.price > 0;
  });

  let freeProduct = productArray.filter(function (item) {
    return !item.price || item.price <= 0;
  });

  document.querySelector(
    ".products-filter label[for=all] span.product-amount"
  ).textContent = productArray.length;
  document.querySelector(
    ".products-filter label[for=paid] span.product-amount"
  ).textContent = paidProduct.length;
  document.querySelector(
    ".products-filter label[for=free] span.product-amount"
  ).textContent = freeProduct.length;

  document
    .querySelector(".products-filter")
    .addEventListener("click", function (e) {
      if (e.target.id == "all") {
        productList(productArray);
      } else if (e.target.id == "free") {
        productList(freeProduct);
      } else if (e.target.id == "paid") {
        productList(paidProduct);
      }
    });
}

function footerEvent() {
  document.querySelector("footer").textContent = `${new Date().getFullYear()}`;
}

// On load
menuEvent();
greetingEvent();
timeEvent();
galleryEvent();
productEvent();
footerEvent();
