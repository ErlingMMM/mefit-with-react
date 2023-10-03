import Calandar from "./Calandar"
import MyGoals from "./MyGoals"
import Progress from "./Progress"
import RemainingDays from "./RemainingDays"

function GoalsDashboard() {
  return (
    <>
     <div>GoalsDashboard</div>
    <Progress/>
    <Calandar/>
    <MyGoals/>
    <RemainingDays/>
    <Progress/>
    </>
   
  )
}

export default GoalsDashboard