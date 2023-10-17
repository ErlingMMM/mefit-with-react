import Calendar from "./Calendar"
import Progress from "./Progress"
import WorkoutBar from "./WorkoutBar"
import styles from "./Dashboard.module.css" //locally scoped
import { useEffect } from "react"
import { fetchWorkouts, setMaxWeek } from "../../../Redux/DashboardSlice"
import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks"
import { setActiveComponent } from '../../../Redux/NavigationSlice';


function Dashboard() {

    const dispatch = useAppDispatch();  // <-- useAppDispatch instead of useDispatch

    const workouts = useAppSelector(state => state.dashboard.workouts);  // <-- useAppSelector instead of useSelector
    const currentWeek = useAppSelector(state => state.dashboard.currentWeek); // <-- useAppSelector instead of useSelector

    const startDay = (currentWeek - 1) * 7 + 1;
    const endDay = currentWeek * 7;

    // Filter out the workouts belonging to the current week
    const filteredWorkouts = workouts.filter(workout => workout.day >= startDay && workout.day <= endDay);

    // Separate current weeks workouts based on completion status
    const upcomingWorkouts = filteredWorkouts.filter(workout => !workout.isCompleted);
    const completedWorkouts = filteredWorkouts.filter(workout => workout.isCompleted);

    // Calculates and sets the last week accessible in the GUI based on the final workout day
    useEffect(() => {
        dispatch(fetchWorkouts());

        if (workouts.length) {
          const lastWorkout = workouts[workouts.length - 1];
          const maxWeek = Math.ceil(lastWorkout.day / 7);
          dispatch(setMaxWeek(maxWeek));
       }

    }, [dispatch]);

    // To navigate to explorer when button is clicked
    const handleClick = () => {    
      dispatch(setActiveComponent('explorer'));   
    };

  return (
    <div className={styles.dashboardContainer}>
    <Progress/>
    <Calendar/>

    {workouts.length === 0 ? (
      // Display this message when user has no program:
      <div className={styles.centeredContent}>
      <h1 className={styles.firstRedirecth1}><b>Select a workout program</b></h1>
      <h1 className={styles.secondRedirecth1}><b>to get started.</b></h1>
      <button onClick={() => handleClick()} className={styles.seeWorkoutPlans}><b>See Workout Plans</b></button>
      </div>
    ) : ( // Otherwise display the program content:
    <> 
    <h1 className={styles.upcoming_h1}><b>Upcoming Workouts:</b></h1>
    {
      upcomingWorkouts.map(workout => (
        <WorkoutBar key={workout.id} day={workout.day} muscleGroup={workout.name} duration={workout.duration} />
      ))
    }
    <h1 className={styles.completed_h1}><b>Completed Workouts:</b></h1>
    {
      completedWorkouts.map(workout => (
        <WorkoutBar key={workout.id} day={workout.day} muscleGroup={workout.name} duration={workout.duration} />
      ))
    }
    </>
  )}
    </div>
   
  )
}

export default Dashboard

