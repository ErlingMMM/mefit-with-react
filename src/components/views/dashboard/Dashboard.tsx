import Calendar from "./Calendar"
import Progress from "./Progress"
import WorkoutBar from "./WorkoutBar"
import styles from "./Dashboard.module.css" //locally scoped
import { useEffect, useState } from "react"
import { fetchWorkouts, getPlanAction } from "../../../Redux/DashboardSlice"
import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks"
import { setActiveComponent } from '../../../Redux/NavigationSlice';
import CoompletedProgramModal from "../../modals/CompletedProgramModal"

function Dashboard() {
  // console.log(keycloak.token) //log the token to console
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // When the completion status of a workout changes the dashboard should fetchWorkouts again and rerender
  const [workoutUpdated, setWorkoutUpdated] = useState(false);
  // UseEffect to Fetch workouts
  useEffect(() => {
    dispatch(fetchWorkouts());
  }, [dispatch, workoutUpdated]);

  // UseEffect to Fetch plan to the store
  useEffect(() => {
    dispatch(getPlanAction());
  }, [dispatch]);

  // To navigate to explorer when button is clicked
  const handleClick = () => {
    dispatch(setActiveComponent('explorer'));
  };

  useEffect(() => {
    const storedFlag = localStorage.getItem("showCompletedModal");

    if (completedWorkouts && (storedFlag !== "completed")) {
      setIsModalOpen(true);
    }
  }, [completedWorkouts]);

  useEffect(() => {
    localStorage.setItem("showCompletedModal", "upcomingWorkouts");

  }, [upcomingWorkouts]);
 

  const handleCloseModal = () => {
    setIsModalOpen(false);
    localStorage.setItem("showCompletedModal", "completed");
  };


  return (
    <div className={styles.dashboardContainer}>
      <Progress />
      <Calendar />

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
              <WorkoutBar key={workout.id} workoutData={workout} updateWorkout={setWorkoutUpdated} />
            ))
          }
          <h1 className={styles.completed_h1}><b>Completed Workouts:</b></h1>
          {
            completedWorkouts.map(workout => (
              <WorkoutBar key={workout.id} workoutData={workout} updateWorkout={setWorkoutUpdated} />
            ))
          }
        </>
      )}

      <CoompletedProgramModal isOpen={isModalOpen} closeModal={handleCloseModal} />
    </div>

  )
}

export default Dashboard

