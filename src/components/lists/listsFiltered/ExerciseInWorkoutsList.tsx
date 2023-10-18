import React from 'react';

interface ExerciseInWorkoutsListProps {
  exercises: any[]; 
  onExerciseClick: (exercise: any) => void; 
}

function ExerciseInWorkoutsList({ exercises, onExerciseClick }: ExerciseInWorkoutsListProps) {
  // Define dummy images URLs
  const dummyImageUrls = [
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxM…',
    'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxM…',
    'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-4.0.3&ixid=M3wxM…',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxM…',
  ];

  const getRandomDummyImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * dummyImageUrls.length);
    return dummyImageUrls[randomIndex];
  };

  return (
    <ul>
      {Array.isArray(exercises) && exercises.length > 0 ? (
        exercises.map((exercise: any) => (
          <li key={exercise.id} className="mb-6">
            <button onClick={() => onExerciseClick(exercise)} className="flex items-start">
              <img src={getRandomDummyImageUrl()} alt={exercise.name} className="custom-image-style" />
              <div>
                <h3 className="text-lg font-bold" style={{ marginLeft: '-20px' }}>
                  {exercise.name}
                </h3>
                <p style={{ marginLeft: '-45px' }}>Level: {exercise.recommendedFitness}</p>
                <br />
                <p style={{ marginLeft: '10px' }}>Duration: {exercise.duration}</p>
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
  );
}

export default ExerciseInWorkoutsList;
