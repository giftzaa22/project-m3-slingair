"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");
const PORT = process.env.PORT || 8000;
const handleFlight = (req, res) => {
  const { flightNumber } = req.params;
  // anything attributed to a req.params is from the endpoint address
  // // get all flight numbers
  // const allFlights = Object.keys(flights);
  // console.log(allFlights);
  // // is flightNumber in the array?
  // console.log("REAL FLIGHT: ", allFlights.includes(flightNumber));
  const seats = flights[flightNumber];
  res.status(200).json({ seats }); // seats are prepared and out for delivery
};

const handleConfirm = (req, res) => {
  //console.log(req.body);
  let body = req.body;
  const newReservation = {
    id: String(Math.floor(Math.random() * 10000000001)),
    flight: body.flightNumber,
    seat: body.selectedSeat,
    givenName: body.givenName,
    surname: body.lastName,
    email: body.email,
  };

  reservations.push(newReservation);
  console.log("Reservations: ", reservations);

  res.status(200).json({ newReservation });
};

const handleReservationConfirmed = (req, res) => {
  const id = req.body.id;

  const reservation = reservations.find((reservation) => {
    return reservation.id === id;
  });

  res.status(200).json({ reservation });
};

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))
  // endpoints
  .get("/flights/:flightNumber", handleFlight)
  .post("/confirm", handleConfirm)
  .post("/reservation-confirmed", handleReservationConfirmed)
  .use((req, res) => res.send("Not Found"))
  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
