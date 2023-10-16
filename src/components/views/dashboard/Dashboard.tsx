import Calendar from "./Calendar"
import Progress from "./Progress"
import WorkoutBar from "./WorkoutBar"
import styles from "./Dashboard.module.css" //locally scoped
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchWorkouts } from "../../../Redux/DashboardSlice"
import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks"


function Dashboard() {

    const dispatch = useAppDispatch();  // <-- useAppDispatch instead of useDispatch

    const workouts = useAppSelector(state => state.dashboard.workouts);  // <-- useAppSelector instead of useSelector
    const currentWeek = useAppSelector(state => state.dashboard.currentWeek); // <-- useAppSelector instead of useSelector

    const startDay = (currentWeek - 1) * 7 + 1;
    const endDay = currentWeek * 7;

    const filteredWorkouts = workouts.filter(workout => workout.day >= startDay && workout.day <= endDay);

    // Separate workouts based on completion status
    const upcomingWorkouts = filteredWorkouts.filter(workout => !workout.isCompleted);
    const completedWorkouts = filteredWorkouts.filter(workout => workout.isCompleted);

    useEffect(() => {
        dispatch(fetchWorkouts());
    }, [dispatch]);

  return (
    <div className={styles.dashboardContainer}>
    <Progress/>
    <Calendar/>
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
    </div>
   
  )
}

export default Dashboard

