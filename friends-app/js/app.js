const MAIN = document.querySelector(".main");

const FRIENDS_COUNT = 50;
const REQUEST_LINK = `https://randomuser.me/api/?results=${FRIENDS_COUNT}`;

//const FRIENDS_DATA = [];

const fetchData = async (requestLink) => {
	try {
		const response = await fetch(requestLink);
		const { results } = await response.json();
		return results;
	} catch (error) {
		alert("HTTP-Error: " + error);
	}
};

class FriendsList {
	constructor(data, parentWrapper) {
		this.cards = data.map((friendData) => new FriendCard(friendData));
		this.wrapper = parentWrapper;
	}
	renderCards() {
		this.wrapper.innerHTML = "";
		this.wrapper.append(...this.cards.map((card) => card.createCard()));
	}
}

class FriendCard {
	constructor(friendData) {
		this.gender = friendData.gender;
		this.name = `${friendData.name.first} ${friendData.name.last}`;
		this.age = friendData.dob.age;
		this.photo = friendData.picture.large;
		this.email = friendData.email;
		this.phone = friendData.cell;
		this.country = friendData.location.country;
	}

	createCard() {
		const card = document.createElement("div");
		card.classList.add("card");
		card.dataset.gender = this.gender;
		card.innerHTML = `<img class="card__img" src="${this.photo}" alt="${this.name} photo"'>\n
                          <h3 class="card__name">${this.name}</h3>\n
                          <span class="card__age">Age: ${this.age}</span>\n
                          <a class="card__phone" href="tel:+${this.phone.replace(/\D/g,"")}">${this.phone}</a>\n
                          <a class="card__email" href="mailto:${this.email}">${this.email}</a>\n
                          <span class="card__country">${this.country}</span>`;
		return card;
	}
}

document.addEventListener("DOMContentLoaded", async () => {
	const dataArray = await fetchData(REQUEST_LINK);
	const friends = new FriendsList(dataArray, MAIN);
	friends.renderCards();
});
