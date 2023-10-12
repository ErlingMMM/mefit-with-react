import { useState } from 'react';
import styles from "./Dashboard.module.css" //locally scoped
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/outline';

type WorkoutBarProps = {
  day: number;
  muscleGroup: string;
  duration: number;
};

function WorkoutBar({day, muscleGroup, duration}: WorkoutBarProps) { //The arguments are passed as props here, but need to come from the database in the parent component

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>

      <div className = {styles.workoutBarWrapper}>
        <div>
          <h1>Day {day}: {muscleGroup}</h1>
          <h1>{duration} min</h1>
        </div>
      
        <button onClick={toggleDetails}>{showDetails ? <ChevronUpIcon className="h-5 w-5 text-[#A8E52E]" /> : <ChevronDownIcon className="h-5 w-5 text-[#A8E52E]" />}</button>
      </div>
      
      {showDetails && (
        <div>
          <p>Workout details go here</p>
        </div>
      )}

      

    </div>
  );
}

export default WorkoutBar;