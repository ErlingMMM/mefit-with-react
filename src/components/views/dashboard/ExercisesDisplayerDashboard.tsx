import { useAppSelector, useAppDispatch } from '../../../Redux/Hooks';
import ExerciseList from '../../lists/ExerciseList';
import { setActiveComponent } from '../../../Redux/NavigationSlice';
import styles from "./Dashboard.module.css" //locally scoped

function ExercisesDisplayerDashboard() {
    const workout = useAppSelector(state => state.dashboard.displayedWorkout);
    const exercisesList = workout?.exercises;

    const dispatch = useAppDispatch();  // <-- useAppDispatch instead of useDispatch
    // To navigate to dashboard when button is clicked
    const handleClick = () => {    
        dispatch(setActiveComponent('dashboard'));   
    };
    return (
        <>
        <img src={workout?.image} alt="Workout visual representation" className={styles.workoutImage} />
        <p className={styles.workoutName}>{workout?.name}</p>
        <p className={styles.workoutDescription}>{workout?.description}</p>

        <div className={styles.divider}></div> {/* divides the sections with a thin grey line */}

        <ExerciseList exercises={exercisesList as any[]} content={"dashboard"} /> 
        <button onClick={() => handleClick()} className={styles.returnToDashboard}><b>Return to dashboard</b></button>
        </>
    ); //Må caste fra ExerciseData[] til any[] siden det er det ExerciseList forventer
}

export default ExercisesDisplayerDashboard;