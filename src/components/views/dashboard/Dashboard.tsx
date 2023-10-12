import Calendar from "./Calendar"
import Progress from "./Progress"
import WorkoutBar from "./WorkoutBar"
import styles from "./Dashboard.module.css" //locally scoped


function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
    <Progress/>
    <Calendar/>
    <h1 className={styles.upcoming_h1}><b>Upcoming Workouts</b></h1>
    <WorkoutBar day={2} muscleGroup={"Full Body"} duration={40}/>
    <WorkoutBar day={3} muscleGroup={"Legs"} duration={45}/>
    <h1 className={styles.completed_h1}><b>Completed Workouts</b></h1>
    <WorkoutBar day={1} muscleGroup={"Upper Body"} duration={50}/>
    </div>
   
  )
}

export default Dashboard

