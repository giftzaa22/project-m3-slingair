const flightNumber = document.getElementById("flight");
const seat = document.getElementById("seat");
const name = document.getElementById("name");
const email = document.getElementById("email");

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

fetch("/reservation-confirmed", {
  method: "POST",
  body: JSON.stringify({ id }),
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((response) => {
    let reservation = response.reservation;
    flightNumber.innerText = reservation.flight;
    seat.innerText = reservation.seat;
    name.innerText = reservation.givenName + " " + reservation.surname;
    email.innerText = reservation.email;
  });
