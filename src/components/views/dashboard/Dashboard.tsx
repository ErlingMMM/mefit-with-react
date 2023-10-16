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

    useEffect(() => {
        dispatch(fetchWorkouts());
    }, [dispatch]);

  return (
    <div className={styles.dashboardContainer}>
    <Progress/>
    <Calendar/>
    <h1 className={styles.upcoming_h1}><b>Upcoming Workouts</b></h1>
    {
    workouts && workouts.length > 1 &&
    <WorkoutBar day={workouts[0].day} muscleGroup={workouts[0].name} duration={workouts[0].duration}/>
    }
    <WorkoutBar day={2} muscleGroup={"Full Body"} duration={40}/>
    <WorkoutBar day={3} muscleGroup={"Legs"} duration={45}/>
    <h1 className={styles.completed_h1}><b>Completed Workouts</b></h1>
    <WorkoutBar day={1} muscleGroup={"Upper Body"} duration={50}/>
    </div>
   
  )
}

export default Dashboard

