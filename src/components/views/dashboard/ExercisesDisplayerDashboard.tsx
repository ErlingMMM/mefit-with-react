import { useSelector } from 'react-redux';
import { useAppSelector } from '../../../Redux/Hooks';
import ExerciseList from '../../lists/ExerciseList';

function ExercisesDisplayerDashboard() {
    const workout = useAppSelector(state => state.dashboard.displayedWorkout);
    const exercisesList = workout?.exercises;
    return (
        <>
        <p>{workout?.image}</p>
        <p>{workout?.name}</p>
        <p>{workout?.description}</p>
        <ExerciseList exercises={exercisesList as any[]} content={"dashboard"} /> 
        </>
    ); //Må caste fra ExerciseData[] til any[] siden det er det ExerciseList forventer
}

export default ExercisesDisplayerDashboard;