import { useSelector } from 'react-redux';
import { OrderListUtils } from '../../../utils/OrderListUtils';
import ExerciseList from '../../../lists/ExerciseList';

function Exercises({ searchQuery }: { searchQuery: string }) {
  const exercises = useSelector((state: any) => state.data.exerciseData);
  const selectedSearchOption = useSelector((state: any) => state.data.selectedSearchOption);
  const selectedSortOption = useSelector((state: any) => state.data.selectedSortOption);

  const orderedList = OrderListUtils(exercises, searchQuery, selectedSearchOption, selectedSortOption);

  return (
    <ExerciseList exercises={orderedList} content={"explorer"} />
  );
}

export default Exercises;
