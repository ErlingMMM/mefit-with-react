import { useState } from 'react';
import styles from "./Dashboard.module.css" //locally scoped

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
    <div className={'bg-blue-500'}>

      <div className = {styles.workoutBarWrapper}>
        <div>
          <h1>Day {day}: {muscleGroup}</h1>
          <h1>{duration} min</h1>
        </div>
      
        <button onClick={toggleDetails}>{showDetails ? '▲' : '▼'}</button>
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