import styles from "./Dashboard.module.css" //locally scoped
import { useAppSelector } from "../../../Redux/Hooks";

function Progress() {
  // get the current week
  const currentWeek = useAppSelector(state => state.dashboard.currentWeek); // <-- useAppSelector instead of useSelector
  const startDay = (currentWeek - 1) * 7 + 1;
  const endDay = currentWeek * 7;
  // get workouts
  const workouts = useAppSelector(state => state.dashboard.workouts);  // <-- useAppSelector instead of useSelector
  // Filter out the workouts belonging to the current week
  const filteredWorkouts = workouts.filter(workout => workout.day >= startDay && workout.day <= endDay);
  // FIlter again to find the completed workouts
  const completedWorkouts = filteredWorkouts.filter(workout => workout.isCompleted);
  
  // the number of workouts to be completed for this week:
  let goalWorkouts: number = filteredWorkouts.length; 
  // the number of completed workouts:
  let numCompletedWorkouts = completedWorkouts.length;
  // The percentage of completed workouts with respect to the total amount of workouts this week
  let progress: number = Math.floor(numCompletedWorkouts/goalWorkouts*100); 
  if(workouts.length == 0){
    progress = 0; // If the user has no plan progress will become NaN so this handles that and overwrites the NaN
  }

  //Get the plan
  const plan = useAppSelector(state => state.dashboard.plan); // <-- useAppSelector instead of useSelector
  //Default image in case there is no plan attached to the logged in user:
  let progressImage : string  = "https://images.unsplash.com/photo-1536922246289-88c42f957773?auto=format&fit=crop&q=80&w=3304&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  if (plan?.image != undefined){
    progressImage = plan?.image
  }

  return (
    <div className={styles.progressParentContainer} style={{ 
      backgroundImage: `linear-gradient(rgba(44, 44, 44, 0.7), rgba(44, 44, 44, 0.7)), url(${progressImage})`,
      backgroundSize: 'cover',      // equivalent to "object-cover"
      backgroundPosition: 'center'  // equivalent to "object-center"
    }}>
      <div className={styles.progressContainer}>

        <h1 className='text-white'><b>Week {currentWeek}</b></h1>

        <div className={styles.goalWrapper}>
          <h1 className={styles.goalText}><b>Goal:</b></h1>
          <h1>{goalWorkouts} workouts</h1>
        </div>

      </div>

      <h1 className={styles.progress_h1}><b>Progress: </b> {progress}%</h1>

      <div className={styles.progressRectangles}>
        {Array.from({ length: goalWorkouts }).map((_, idx) => ( //maps from [undefined, undefined, ..., undefined] of length n = goalWorkouts to [1,2,..,n]
          <div 
            key={idx} // if idx is less than completedWorkouts its green (completed) otherwise grey (pending)
            className={`${styles.rectangle} ${idx < numCompletedWorkouts ? styles.completedRectangle : styles.pendingRectangle}`}
          ></div>
        ))}
      </div>

    </div>
  );
}

export default Progress;
