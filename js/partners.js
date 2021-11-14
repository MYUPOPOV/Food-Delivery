const cardsRestourants = document.querySelector(".cards-restaurants");

// console.log(cardsRestourants);

// cardsRestourants.classList.add("123");
// cardsRestourants.classList.remove("123");
// cardsRestourants.classList.toggle("123");
// cardsRestourants.classList.toggle("123");

// console.dir(cardsRestourants);

const renderItems = (data) => {
	data.forEach((item) => {
		const { name, image, price, kitchen, products, stars, time_of_delivery } =
			item;
		const a = document.createElement("a");

		a.setAttribute("href", "/restaurant.html");
		a.classList.add("card");
		a.classList.add("card-restaurant");
		a.dataset.products = products;

		// console.log(a.dataset.products);

		a.innerHTML = `
      <img src=${image} alt=${name} />
      <div class="card-text">
        <div class="card-heading">
          <h3 class="card-title">${name}</h3>
          <span class="card-tag tag">${time_of_delivery} мин</span>
        </div>
        <div class="card-info">
          <div class="rating">
          ${stars}
          </div>
          <div class="price">${price}</div>
          <div class="category">${kitchen}</div>
        </div>
      </div>

    `;

		a.addEventListener("click", (e) => {
			e.preventDefault();
			// console.log(a);
			if (localStorage.getItem("user")) {
				const link = a.dataset.products;
				localStorage.setItem("restaurant", JSON.stringify(item));
				window.location.href = "./restaurant.html";
			} else {
				modalAuth.style.display = "flex";
			}
		});

		cardsRestourants.append(a);

		// console.log(a);
	});
};

fetch("https://test1-8606d-default-rtdb.firebaseio.com/db/partners.json")
	.then((response) => response.json())
	.then((data) => {
		renderItems(data);
	})
	.catch((error) => {
		console.log(error);
	});
