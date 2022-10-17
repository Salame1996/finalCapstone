import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getReservation, updateReservation } from "../../utils/api";
import ErrorAlert from "../ErrorAlert";
import { ReservationForm } from "./ReservationForms";

function ReservationEdit({ date }) {
  const { reservation_id } = useParams();
  const [currentReservation, setCurrentReservation] = useState({
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: date,
    reservation_time: "",
    people: "1",
    reservation_id,
});
  const [error, setError] = useState(null);
  const history = useHistory();
  
  useEffect(() => {
    getReservation(reservation_id)
    .then((response) => {
      setCurrentReservation({
        ...response,
        people: Number(response.people),
      })
    })
    .catch(setError);
  }, [reservation_id]);

  
  
  const handleChange = ({ target }) => {
    setCurrentReservation({
      ...currentReservation,
      [target.name]: target.value,
    })
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    updateReservation({
      ...currentReservation,
      people: Number(currentReservation.people),
    })
    .then((response) => {
      setCurrentReservation({...response})
      history.push(`/dashboard?date=${currentReservation.reservation_date}`)
    })
    
    .catch(setError)
  }

  return (
    <>
      <h1> Edit Reservation: {reservation_id} </h1>
      <ErrorAlert error={error} />
    <ReservationForm handleChange={handleChange} handleSubmit={handleSubmit} history ={history} reservation={currentReservation} />
    </>
  )
}

export default ReservationEdit;