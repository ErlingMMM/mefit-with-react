import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedWorkoutId } from '../../../../Redux/selectId/SelectedWorkoutIdSlice';
import { setActiveComponent } from '../../../../Redux/NavigationSlice';
import WorkoutsList from  '../../../lists/WorkoutsList';
import { OrderListUtils } from '../../../utils/OrderListUtils';


function Workouts({ searchQuery }: { searchQuery: string }) {
  const workouts = useSelector((state: any) => state.data.workoutData);
  const selectedSearchOption = useSelector((state: any) => state.data.selectedSearchOption);
  const selectedSortOption = useSelector((state: any) => state.data.selectedSortOption);
  const dispatch = useDispatch();

  const handleClick = (id: number) => {
    dispatch(setActiveComponent('exercisesInWorkouts'));
    dispatch(setSelectedWorkoutId(id));
  };



  const orderedList = OrderListUtils(workouts, searchQuery, selectedSearchOption, selectedSortOption);


  return (
    <div>
      <WorkoutsList workouts={orderedList} onClick={handleClick} />
    </div>
  );
}

export default Workouts;
