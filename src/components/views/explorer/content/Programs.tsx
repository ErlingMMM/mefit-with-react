import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveComponent } from '../../../../Redux/NavigationSlice';
import { setSelectedProgramId } from '../../../../Redux/selectId/SelectedProgramIdSlice';
import { OrderListUtils } from '../../../utils/OrderListUtils';
import ProgramsList from '../../../lists/ProgramsList';


function Programs({ searchQuery }: { searchQuery: string }) {
  const programs = useSelector((state: any) => state.data.programData);
  const selectedSearchOption = useSelector((state: any) => state.data.selectedSearchOption);
  const selectedSortOption = useSelector((state: any) => state.data.selectedSortOption);
  const dispatch = useDispatch();

  const handleClick = (id: number) => {    
    dispatch(setActiveComponent('workoutsInProgram'));
    dispatch(setSelectedProgramId(id));    
  };

  const orderedList = OrderListUtils(programs, searchQuery, selectedSearchOption, selectedSortOption);

  return (
    <ProgramsList programs={orderedList} onClick={handleClick} />
  );
}

export default Programs;
