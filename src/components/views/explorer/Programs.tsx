import { useSelector, useDispatch } from 'react-redux';
import { setActiveComponent } from '../../../Redux/NavigationSlice';
import { setWorkoutIdsInProgram } from '../../../Redux/WorkoutIdsInProgramSlice';

function Programs({ searchQuery }: { searchQuery: string; }) {
  const programs = useSelector((state: any) => state.data.programData);
  const dispatch = useDispatch();

  const handleProgramClick = (workoutIds: number[]) => {    
    dispatch(setActiveComponent('workoutsInProgram'));
    dispatch(setWorkoutIdsInProgram(workoutIds));
  };

  const filteredPrograms = Array.isArray(programs)
    ? programs.filter((program: any) => {
      const query = searchQuery.toLowerCase();
      const programName = program.name.toLowerCase();
      return programName.includes(query);
    })
    : [];

  // Define dummy images URLs
  const dummyImageUrls = [
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3269&q=80',
    'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3274&q=80',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=3387&q=80',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=3270&q=80',
  ];

  // Helper function to get a random dummy image URL
  const getRandomDummyImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * dummyImageUrls.length);
    return dummyImageUrls[randomIndex];
  };

  return (
    <div>
      <div>
        <ul>
          {Array.isArray(filteredPrograms) && filteredPrograms.length > 0 ? (
            filteredPrograms.map((program: any) => (
              <li key={program.id} className="mb-6">
                <button onClick={() => handleProgramClick(program.workoutIds)}>                
                <div >
                  <img
                    src={getRandomDummyImageUrl()}
                    alt={program.name}
                    className="w-80 h-24 rounded-lg mx-auto"
                  />
                </div>
                  <div className="flex items-start">
                    <h3 className="text-lg font-bold">
                      {program.name}
                    </h3>
                    <p>{program.description}</p>
                  </div>
                </button>
              </li>
            ))
          ) : (
            <div>
              <li>No matching programs</li>
            </div>
          )}
        </ul>
      </div>

    </div>
  );
}


export default Programs;

