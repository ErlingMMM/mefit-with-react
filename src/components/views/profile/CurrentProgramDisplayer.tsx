import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks"
import DifficultyUtils from "../../utils/DifficultyUtils";
import ProgressBar from "./ProgressBar";

function CurrentProgramDisplayer(){

    const workouts = useAppSelector(state => state.dashboard.workouts);  // <-- useAppSelector instead of useSelector
    const completedWorkouts = workouts.filter(workout => workout.isCompleted);
    const percentage = Math.floor(completedWorkouts.length/workouts.length*100);  // You can replace this with a dynamic value later
    const maxDay = Math.max(...workouts.map(workout => workout.day));
    const totalWeeks = Math.ceil(maxDay / 7);

    
    
    const plan = useAppSelector(state => state.dashboard.plan)
    // If plan is falsy (0, null, undefined, etc.), return an empty div
    if (!plan) {
        return <div></div>;
    }
    return (
        <div className="relative w-full h-24 mx-auto overflow-hidden rounded-lg">
            <ProgressBar percentage={percentage} />
            <img
                src={plan?.image}
                alt={"Image of current program"}
                /*className="w-80 h-24 rounded-lg mx-auto object-cover object-top overflow-hidden"*/
                className="absolute top-0 left-0 w-full h-full object-cover object-top"
            />
            <div className="absolute top-1/4 left-2 text-white font-bold flex items-center">
                <img src="/Icons/progress_activity.png" alt="Calendar" className="mr-2" />
                {totalWeeks} weeks
            </div>
            <div className="absolute bottom-1 left-2  text-white font-bold flex items-center">
                <div className="mr-2">{DifficultyUtils.difficultyToLabel(plan?.difficulty)}</div>
                <img src={`/Icons/${DifficultyUtils.difficultyToLabel(plan?.difficulty)}.png`} alt="Calendar" className="mt-[-12px]"/>
            </div>
        </div>
    )
}

export default CurrentProgramDisplayer