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
    <ul className='ml-5'>
      {workouts.map((workout) => (
        <li key={workout.id} className="mb-6">
          <button onClick={() => onClick(workout.id)} className="flex items-start">
            <img src={workout.image} alt={workout.name} className="custom-image-style hover:opacity-80" />
            <div>
              <div className="text-lg font-bold" style={{ marginRight: '70px' }}>{workout.name}</div>
              <p style={{ marginRight: '30px' }}>Duration: {DurationUtils.formatDuration(workout.duration)} </p>
              <br />
              <p style={{ marginLeft: '10px' }}>{DifficultyUtils.difficultyToLabel(workout.difficulty)}</p>
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
  }

export default WorkoutsList;
