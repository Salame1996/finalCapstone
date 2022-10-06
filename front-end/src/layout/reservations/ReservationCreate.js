import React, { useState } from "react";
import { useHistory } from "react-router";
import { createReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import {ReservationForm} from "./ReservationForms";

function ReservationCreate({ date }) {

  const history = useHistory();
  const [error, setError] = useState(null);

  const [reservation, setReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: date,
    reservation_time: "",
    people: "1",
  })

  // Event Change Handler 
  const handleChange = ({ target }) => {
    setReservation({
      ...reservation,
      [target.name]: target.value,
    });
  }

  // event submit handler
  function handleSubmit(event) {
    event.preventDefault();
    createReservation({
      ...reservation,
      people: Number(reservation.people),
    })
      .then(() => {
        history.push(`/dashboard?date=${reservation.reservation_date}`);
      })
      .catch(setError);
  }

  return (
    <>
      <h1> Create A Reservation </h1>
      <ErrorAlert error={error} />
     <ReservationForm handleSubmit={handleSubmit} handleChange ={handleChange} reservation ={reservation} history ={history}/>
    </>
  );
}

export default ReservationCreate;