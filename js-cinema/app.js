const SEAT_PRICE = 2;
const ACTIVE_SEATS = [];

const FORM_BOOKING = document.querySelector(".form__booking");
const FORM_TICKETS_NUMBER = document.querySelector(".form__tickets-number");
const FORM_TICKETS_COST = document.querySelector(".form__tickets-cost");
const TICKETS_CONTAINER = document.querySelector(".tickets__cont");

const initApp = () => {
	bindEventListeners(FORM_BOOKING, TICKETS_CONTAINER, ACTIVE_SEATS, SEAT_PRICE);
};

const bindEventListeners = (formElement, ticketsContainer, seatsArray, seatPrice) => {
	formElement.addEventListener("input", ({ target }) => {
		if (target.checked === true) {
			addSeat(seatsArray, target.dataset.row, target.dataset.seat);
		} else if (target.checked === false) {
			deleteSeat(seatsArray, target.dataset.row, target.dataset.seat);
		}
		updateForm(formElement, seatsArray, seatPrice);
		updateTickets(ticketsContainer, seatsArray, seatPrice);
	});
};

const addSeat = (seatsArray, row, seat) => {
	seatsArray.push(`${row}-${seat}`);
};

const deleteSeat = (seatsArray, row, seat) => {
	seatsArray.splice(seatsArray.indexOf(`${row}-${seat}`), 1);
};

const updateForm = (formElement, seatsArray, seatPrice) => {
	if (seatsArray.length > 0) {
		FORM_TICKETS_NUMBER.textContent = seatsArray.length + " ticket";
		if (seatsArray.length > 1) FORM_TICKETS_NUMBER.textContent += "s";
		FORM_TICKETS_COST.textContent = " for " + seatsArray.length * seatPrice + "$";
	} else {
		FORM_TICKETS_NUMBER.textContent = "";
		FORM_TICKETS_COST.textContent = "Select seats";
	}
};

const getTicketHtml = ([row, seat], price) => `
    <div class="booked__tickets--ticket">
        <span class="ticket__row">Row: ${row}</span>
        <span class="ticket__seat">Seat: ${seat}</span>
        <span class="ticket__price">Price: ${price}$</span>
    </div>`;

const getTicketsHtml = (seatsArray, seatPrice) => {
	if (seatsArray.length > 0) {
		return seatsArray.map((bookedSeat) => getTicketHtml(bookedSeat.split("-"), seatPrice)).join("");
	}
	return "<p>Select seats</p>";
};

const updateTickets = (ticketsContainer, seatsArray, seatPrice) => {
	ticketsContainer.innerHTML = getTicketsHtml(seatsArray, seatPrice);
};

document.addEventListener("DOMContentLoaded", () => {
	initApp();
});
