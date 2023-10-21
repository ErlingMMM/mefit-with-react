import React from 'react';

interface WorkoutsInProgramListProps {
  workouts: any[];
  onWorkoutClick: (workout: any) => void;
}

function WorkoutsInProgramList({ workouts, onWorkoutClick }: WorkoutsInProgramListProps) {
  // Helper function to get a random dummy image URL
  const getRandomDummyImageUrl = () => {
    const dummyImageUrls = [
      'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxM…',
      'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxM…',
      'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxM…',
    ];

    const randomIndex = Math.floor(Math.random() * dummyImageUrls.length);
    return dummyImageUrls[randomIndex];
  };

  return (
    <div>
      <ul>
        {Array.isArray(workouts) && workouts.length > 0 ? (
          workouts.map((workout: any) => (
            <li key={workout.id} className="mb-6">
              <button onClick={() => onWorkoutClick(workout)} className="flex items-start">
                <img src={getRandomDummyImageUrl()} alt={workout.name} className="custom-image-style" />
                <div>
                  <h3 className="text-lg font-bold" style={{ marginLeft: '-20px' }}>
                    {workout.name}
                  </h3>
                  <p style={{ marginLeft: '-45px' }}>Level: {workout.recommendedFitness}</p>
                  <br />
                  <p style={{ marginLeft: '10px' }}>Duration {workout.duration}</p>
                </div>
              </button>
            </li>
          ))
        ) : (
          <div>
            <li>No matching exercises</li>
          </div>
        )}
      </ul>
    </div>
  );
}

export default WorkoutsInProgramList;
