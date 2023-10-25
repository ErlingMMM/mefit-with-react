import { useState } from 'react';
import styles from "./Dashboard.module.css" //locally scoped
import { ChevronUpIcon, ChevronDownIcon, ClockIcon, CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/outline';
import { useAppDispatch } from '../../../Redux/Hooks';
import { completeWorkoutAction } from '../../../Redux/DashboardSlice';
import { setActiveComponent } from '../../../Redux/NavigationSlice';
import { setDisplayedWorkout } from '../../../Redux/DashboardSlice';
import { useTheme } from '../../../styles/ThemeContext';
interface ExerciseData {
  id: number;
  name: string;
  description: string;
  muscleGroup: string;
  imageUrl?: string;
  duration: number;
  difficulty: number;
  sets: number;
  reps: number;
}

type WorkoutBarProps = {
  workoutData: {
    id: number;
    name: string;
    description?: string;
    difficulty: number;
    image?: string;
    duration: number;
    day: number;
    isCompleted: boolean;
    exercises: ExerciseData[]; 
    };
};

interface CompleteWorkoutDTO {
  workoutId: number;
  day: number;
}

const dayDictionary: { [key: number]: string } = {
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
  0: "Sunday"
};

function WorkoutBar({workoutData, updateWorkout} : WorkoutBarProps & { updateWorkout : React.Dispatch<React.SetStateAction<boolean>> }) { 
  const completeData: CompleteWorkoutDTO = {
    workoutId: workoutData.id,
    day: workoutData.day
  };

  const { isDarkMode } = useTheme();
  const dispatch = useAppDispatch();  // <-- useAppDispatch instead of useDispatch

  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const updateCompletionStatus = async (data:CompleteWorkoutDTO) => {
    try {
      await dispatch(completeWorkoutAction(data)).unwrap(); // unwrap() will throw an error if the promise is rejected
      updateWorkout(prev => !prev); // updateWorkout is the same function as setWorkoutUpdated passed down from the parent. This will automatically toggle the value of workoutUpdated
  } catch (error) {
      console.error("Failed to complete workout:", error);
      // Handle error appropriately, perhaps show an error message to the user
  }
  }

  const weekday : string = dayDictionary[workoutData.day%7]; 
  //Keep in mind for this to make sense, the start date for the program has to be a monday

  // To navigate to workout displayer when button is clicked
  const handleClick = () => {    
    dispatch(setDisplayedWorkout(workoutData))
    dispatch(setActiveComponent('exercisesInDashboard'));   
  };

  return (
    <div>

      <div className = {styles.workoutBarWrapper} style={{ 
        backgroundImage: `linear-gradient(rgba(44, 44, 44, 0.7), rgba(44, 44, 44, 0.7)), url(${workoutData.image})`,
        backgroundSize: 'cover',      // equivalent to "object-cover"
        backgroundPosition: 'center'  // equivalent to "object-center"
        }}> 
        <div>
          <h1 className={styles.day_h1}><b>{weekday}</b>: {workoutData.name}</h1>
          <div className={styles.durationWrapper}>
            <ClockIcon className="h-5 w-5 text-[#A8E52E]"/>
            <span className='text-white'>{workoutData.duration} min</span>
          </div>
        </div>

        <div className={styles.buttonsGroup}>
          <button onClick={() => updateCompletionStatus(completeData)}>{workoutData.isCompleted ? <CheckCircleIcon className="h-7 w-7 text-[#A8E52E]" /> : <PlusCircleIcon className={`h-7 w-7 ${isDarkMode ? 'text-white' : 'text-white'}`}></PlusCircleIcon>}</button>
          <button onClick={toggleDetails}>{showDetails ? <ChevronUpIcon className="h-7 w-7 text-[#A8E52E]" /> : <ChevronDownIcon className="h-7 w-7 text-[#A8E52E]" />}</button>
        </div>

      </div>
      
      {showDetails && (
        <div className={styles.showDetailsWrapper}>
          <b className={styles.infoRow}><span>Excercise</span><span>Sets</span><span>Reps</span></b>
          {workoutData.exercises.map((exercise) => (
            <p key={exercise.id} className={styles.infoRow}>
              <span>{exercise.name}</span>
              <span>{exercise.sets}</span>
              <span>{exercise.reps}</span>
            </p>
          ))}
          <button onClick={() => handleClick()} className={styles.seeDetailedWorkout}><b>See Workout</b></button>
        </div>
      )}

      

    </div>
  );
}

export default WorkoutBar;