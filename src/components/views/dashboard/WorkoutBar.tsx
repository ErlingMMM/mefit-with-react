import { useState } from 'react';
import styles from "./Dashboard.module.css" //locally scoped
import { ChevronUpIcon, ChevronDownIcon, ClockIcon } from '@heroicons/react/outline';

type WorkoutBarProps = {
  day: number;
  muscleGroup: string;
  duration: number;
};

const dayDictionary: { [key: number]: string } = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday"
};

function WorkoutBar({day, muscleGroup, duration}: WorkoutBarProps) { //The arguments are passed as props here, but need to come from the database in the parent component

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const weekday : string = dayDictionary[day%7]; 
  //Keep in mind for this to make sense, the start date for the program has to be a monday

  return (
    <div>

      <div className = {styles.workoutBarWrapper}>
        <div>
          <h1 className={styles.day_h1}><b>{weekday}</b>: {muscleGroup}</h1>
          <div className={styles.durationWrapper}>
            <ClockIcon className="h-5 w-5 text-[#A8E52E]"/>
            <span>{duration} min</span>
          </div>
        </div>
      
        <button onClick={toggleDetails}>{showDetails ? <ChevronUpIcon className="h-7 w-7 text-[#A8E52E]" /> : <ChevronDownIcon className="h-7 w-7 text-[#A8E52E]" />}</button>
      </div>
      
      {showDetails && (
        <div className={styles.showDetailsWrapper}>
          <b className={styles.infoRow}><span>Excercise</span><span>Sets</span><span>Reps</span></b>
          <p className={styles.infoRow}><span>Placeholder exercise</span><span>4</span><span>12</span></p> 
          <button className={styles.seeDetailedWorkout}><b>See Workout</b></button>
        </div>
      )}

      

    </div>
  );
}

export default WorkoutBar;