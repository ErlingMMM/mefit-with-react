
import React, { useState } from 'react';
import ExerciseModal from '../modals/ExerciseModal';
import '../../styles/ImageStyle.css';
import DifficultyUtils from '../utils/DifficultyUtils';

function ExerciseList({ exercises, content }: { content: string, exercises: any[]; }) {

  const [selectedExercise, setSelectedExercise] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (exercise: any) => {
    setSelectedExercise(exercise);
    setIsModalOpen(true);
  };




  const renderExercises = () => {
    return exercises.map((exercise: any) => (
      <li key={exercise.id} className="mb-6">
        <button onClick={() => openModal(exercise)} className="flex items-start">
          <img src={exercise.image} alt={exercise.name} className="custom-image-style hover:opacity-80" />
          <div className="w-48">
          <div className="text-left">  
              <h3 className="text-lg font-bold">
                {exercise.name}
              </h3>
            </div>
            {content === 'explorer' ? (
              <>
                <div className="text-left">
                  <p>{DifficultyUtils.difficultyToLabel(exercise.difficulty)}</p>
                </div>
                <br />

                <p className="flex flex-wrap h-7 overflow-hidden">
                  {exercise.muscleGroup.split(', ').map((group: string, index: number) => (
                    <span key={index} className="whitespace-nowrap">
                      {group}
                      {index < exercise.muscleGroup.split(', ').length - 1 ? ', ' : ''}
                    </span>
                  ))}
                </p>
              </>
            ) : (
              <>
                <p style={{ marginRight: '4rem' }}>{exercise.muscleGroup}</p>
                <br />
                <b className="flex space-x-2" style={{ marginLeft: '10px' }}>
                  <span className="mr-2">Sets: {exercise.sets}</span>
                  <span>Reps: {exercise.reps}</span>
                </b>
              </>
            )}
          </div>
        </button>
      </li>
    ));
  };

  return (
    <div>
    <div className={`sm:flex sm:justify-center`}>
        <ul className={`${content === "program" ? "" : "sm:mr-28"} ml-5 sm:grid sm:grid-cols-2 sm:gap-4`}>
          {exercises.length > 0 ? (
            renderExercises()
          ) : (
            <div>
              <li>No matching exercises</li>
            </div>
          )}
        </ul>
      </div>
      <ExerciseModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} exercise={selectedExercise} />
    </div>
  );
}

export default ExerciseList;
