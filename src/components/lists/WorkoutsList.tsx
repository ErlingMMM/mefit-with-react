import React from 'react';

interface Workout {
  id: number;
  name: string;
  description: string;
}

interface WorkoutsListProps {
  workouts: Workout[];
  onClick: (id: number) => void;
}

function WorkoutsList({ workouts, onClick }: WorkoutsListProps) {
  // Define dummy images URLs
  const dummyImageUrls = [
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxMzA5&auto=format&fit=crop&w=3269&q=80',
    'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxMzA5&auto=format&fit=crop&w=3274&q=80',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxMzA5&auto=format&fit=crop&w=3387&q=80',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxMzA5&auto=format&fit=crop&w=3270&q=80',
  ];


  // Helper function to get a random dummy image URL
  const getRandomDummyImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * dummyImageUrls.length);
    return dummyImageUrls[randomIndex];
  };

  return (
    <ul className='ml-5'>
      {workouts.map((workout) => (
        <li key={workout.id} className="mb-6">
          <button onClick={() => onClick(workout.id)} className="flex items-start">
            <img src={getRandomDummyImageUrl()} alt={workout.name} className="custom-image-style" />
            <div>
              <h3 className="text-lg font-bold">{workout.name}</h3>
              <p>{workout.description}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}

export default WorkoutsList;
