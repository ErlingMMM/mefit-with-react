import React from 'react'
import styles from "./Dashboard.module.css" //locally scoped
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks';
import { setCurrentWeek } from '../../../Redux/DashboardSlice'; // Assuming path to your slice file.
import { getStartDateAction } from '../../../Redux/DashboardSlice';
import { useEffect } from 'react';



function Calendar() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getStartDateAction());
  }, [dispatch]);

  const currentWeek = useAppSelector(state => state.dashboard.currentWeek);
  const maxWeek = useAppSelector(state => state.dashboard.maxWeek);
  const startDateString = useAppSelector(state => state.dashboard.startDate);
  console.log(`maxWeek: ${maxWeek}`)
  let startDate;
  try {
    startDate = new Date(startDateString);
    if (isNaN(startDate.getTime())) { // Check if the date is invalid
      console.log("Invalid date format")
      throw new Error("Invalid date format");
    } 
  } catch (error) {
    startDate = new Date("2024-12-04"); //Set the start date to "2024-12-04" if the date is invalid
  }

  

  const { start, end } = getStartWeek(startDate, currentWeek);

  return (
    <div className={styles.dateParentContainer}>

      <button onClick={() => dispatch(setCurrentWeek(Math.max(currentWeek - 1, 1)))}>
        {<ChevronLeftIcon className="h-7 w-7" /> }
      </button> 
      
      <div className={styles.dateContainer}>
        <img src="/Icons/calendar.png" alt="Calendar" />
        <span><b>{start} - {end}</b></span>
      </div>

      <button onClick={() => dispatch(setCurrentWeek(Math.min(currentWeek + 1, maxWeek)))}>
        <ChevronRightIcon className="h-7 w-7" />
      </button> 

    </div>
  )
}

export default Calendar
//TODO:
//Need to make the buttons have onClick functionality. 

//------------------------------------------------------------------
//Helper functions: 
function getStartWeek(startDate : Date, offset = 1) { //offset = integer value of current week
  const monday = new Date(startDate);
  monday.setDate(monday.getDate() - monday.getDay()  + 1 + ((offset-1) * 7)); // getDay() returns 0 for Sunday, 1 for Monday, etc.
                                                            //'offset*7' takes the current week into account
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  return {
    start: `${monday.getDate()}.${monday.getMonth() + 1}`, // +1 because getMonth() returns 0-11
    end: `${sunday.getDate()}.${sunday.getMonth() + 1}`
  };
}