import React from 'react';
import DurationUtils from '../utils/DurationUtils';
import DifficultyUtils from '../utils/DifficultyUtils';


interface Workout {
  id: number;
  name: string;
  description: string;
  duration: number;
  difficulty: number;
  image: string;
}

interface WorkoutsListProps {
  workouts: Workout[];
  onClick: (id: number) => void;
}

function WorkoutsList({ workouts, onClick }: WorkoutsListProps) {

  

  return (
<div className="sm:flex sm:justify-center sm:items-center">
  <ul className="sm:flex sm:flex-wrap sm:justify-center mx-6 sm:-mx-28  md:grid  md:-mr-1 md:gap-10 md:grid-cols-2">
    {workouts.map((workout) => (
      <li key={workout.id} className="mb-6">
        <button onClick={() => onClick(workout.id)} className="flex items-start">
          <img src={workout.image} alt={workout.name} className="custom-image-style hover:opacity-80" />
          <div className="text-left ml-3"> 
            <div className="text-lg font-bold">{workout.name}</div>
            <p>Duration: {DurationUtils.formatDuration(workout.duration)}</p>
            <br />
            <p>{DifficultyUtils.difficultyToLabel(workout.difficulty)}</p>
          </div>
        </button>
      </li>
    ))}
  </ul>
</div>

  );
  }

export default WorkoutsList;
