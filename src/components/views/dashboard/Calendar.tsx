import React from 'react'
import styles from "./Dashboard.module.css" //locally scoped

function Calendar() {
  const { start, end } = getCurrentWeek();
  return (
    <div className={`${styles.dateParentContainer} bg-blue-500`}>

      <button>{"<"}</button> 
      
      <div className={styles.dateContainer}>
        <img src="/Icons/calendar.png" alt="Calendar" />
        <span>{start} - {end}</span>
      </div>

      <button>{">"}</button> 

    </div>
  )
}

export default Calendar
//TODO:
//Need to make the buttons have onClick functionality. 

//------------------------------------------------------------------
//Helper functions: 
function getCurrentWeek() {
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(monday.getDate() - monday.getDay() + 1); // getDay() returns 0 for Sunday, 1 for Monday, etc.

  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  return {
    start: `${monday.getDate()}.${monday.getMonth() + 1}`, // +1 because getMonth() returns 0-11
    end: `${sunday.getDate()}.${sunday.getMonth() + 1}`
  };
}