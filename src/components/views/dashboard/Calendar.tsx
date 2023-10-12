import React from 'react'
import styles from "./Dashboard.module.css" //locally scoped
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';


function Calendar() {
  const { start, end } = getCurrentWeek();
  return (
    <div className={styles.dateParentContainer}>

      <button>{<ChevronLeftIcon className="h-5 w-5" /> }</button> 
      
      <div className={styles.dateContainer}>
        <img src="/Icons/calendar.png" alt="Calendar" />
        <span>{start} - {end}</span>
      </div>

      <button><ChevronRightIcon className="h-5 w-5" /></button> 

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