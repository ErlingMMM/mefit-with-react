import { useAppDispatch, useAppSelector } from "../../../Redux/Hooks"
import DifficultyUtils from "../../utils/DifficultyUtils";
import ProgressBar from "./ProgressBar";

function CurrentProgramDisplayer(){

    const workouts = useAppSelector(state => state.dashboard.workouts);  // <-- useAppSelector instead of useSelector
    const completedWorkouts = workouts.filter(workout => workout.isCompleted);
    const percentage = Math.floor(completedWorkouts.length/workouts.length*100);  // You can replace this with a dynamic value later

    const dummyUrl: string = 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3269&q=80';
    


    return (
        <div className="relative w-80 h-24 mx-auto overflow-hidden rounded-lg">
            <ProgressBar percentage={percentage} />
            <img
                src={dummyUrl}
                alt={"Image of current program"}
                /*className="w-80 h-24 rounded-lg mx-auto object-cover object-top overflow-hidden"*/
                className="absolute top-0 left-0 w-full h-full object-cover object-top"
            />
            <div className="absolute top-1/7 left-2 text-white font-bold">14 weeks</div>
            <div className="absolute bottom-1 left-2  text-white font-bold">Intermediate</div>
        </div>
    )
}

export default CurrentProgramDisplayer