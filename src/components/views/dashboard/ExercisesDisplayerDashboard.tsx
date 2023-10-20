import { useAppSelector, useAppDispatch } from '../../../Redux/Hooks';
import ExerciseList from '../../lists/ExerciseList';
import { setActiveComponent } from '../../../Redux/NavigationSlice';
import styles from "./Dashboard.module.css" //locally scoped

function ExercisesDisplayerDashboard() {
    const workout = useAppSelector(state => state.dashboard.displayedWorkout);
    const exercisesList = workout?.exercises;

    const dispatch = useAppDispatch();  // <-- useAppDispatch instead of useDispatch
    // To navigate to workout displayer when button is clicked
    const handleClick = () => {    
        dispatch(setActiveComponent('dashboard'));   
    };
    return (
        <>
        <p>{workout?.image}</p>
        <p>{workout?.name}</p>
        <p>{workout?.description}</p>
        <ExerciseList exercises={exercisesList as any[]} content={"dashboard"} /> 
        <button onClick={() => handleClick()} className={styles.seeDetailedWorkout}><b>Return to dashboard</b></button>
        </>
    ); //Må caste fra ExerciseData[] til any[] siden det er det ExerciseList forventer
}

export default ExercisesDisplayerDashboard;