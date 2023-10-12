import Calendar from "./Calendar"
import Progress from "./Progress"
import WorkoutBar from "./WorkoutBar"


function Dashboard() {
  return (
    <>
    <Progress/>
    <Calendar/>
    <h1>Upcoming Workouts</h1>
    <WorkoutBar day={2} muscleGroup={"Full Body"} duration={40}/>
    <WorkoutBar day={3} muscleGroup={"Legs"} duration={45}/>
    <h1>Completed Workouts</h1>
    <WorkoutBar day={1} muscleGroup={"Upper Body"} duration={50}/>
    </>
   
  )
}

export default Dashboard

