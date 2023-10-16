import React from 'react'
import styles from "./Dashboard.module.css" //locally scoped
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useAppDispatch, useAppSelector } from '../../../Redux/Hooks';
import { setCurrentWeek } from '../../../Redux/DashboardSlice'; // Assuming path to your slice file.



function Calendar() {
  const dispatch = useAppDispatch();
  const currentWeek = useAppSelector(state => state.dashboard.currentWeek);
  const { start, end } = getCurrentWeek();
  return (
    <div className={styles.dateParentContainer}>

      <button onClick={() => dispatch(setCurrentWeek(Math.max(currentWeek - 1, 1)))}>
        {<ChevronLeftIcon className="h-7 w-7" /> }
      </button> 
      
      <div className={styles.dateContainer}>
        <img src="/Icons/calendar.png" alt="Calendar" />
        <span><b>{start} - {end}</b></span>
      </div>

      <button onClick={() => dispatch(setCurrentWeek(currentWeek + 1))}>
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
function getCurrentWeek(offset = 0) { //offset = integer value of current week
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(monday.getDate() - monday.getDay() + 1 + (offset * 7)); // getDay() returns 0 for Sunday, 1 for Monday, etc.
                                                            //'offset*7' takes the current week into account
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);

  return {
    start: `${monday.getDate()}.${monday.getMonth() + 1}`, // +1 because getMonth() returns 0-11
    end: `${sunday.getDate()}.${sunday.getMonth() + 1}`
  };
}