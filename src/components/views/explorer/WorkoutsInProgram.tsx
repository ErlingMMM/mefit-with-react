import { useState } from 'react';
import ExerciseModal from '../../modals/ExerciseModal';
import { useSelector } from 'react-redux';


function WorkoutsInProgram() {
  const workouts = useSelector((state: any) => state.data.workoutData);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const workoutIds = useSelector((state: any) => state.data.workoutIds); 

  const openModal = (workout: any) => {
    setSelectedWorkout(workout);
    setIsModalOpen(true);
  };

  console.log(workoutIds);

 

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
   hei
    </div>
  );
}


export default WorkoutsInProgram;