
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

  // Define dummy exercise images URLs
  const dummyImageUrls = [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3270&q=80',
    'https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=3269&q=80',
  ];

  // Helper function to get a random dummy image URL
  const getRandomDummyImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * dummyImageUrls.length);
    return dummyImageUrls[randomIndex];
  };







  const renderExercises = () => {
    return exercises.map((exercise: any) => (
      <li key={exercise.id} className="mb-6">
        <button onClick={() => openModal(exercise)} className="flex items-start">
          <img src={getRandomDummyImageUrl()} alt={exercise.name} className="custom-image-style hover:opacity-80" />
          <div className="w-48">
            <div className='mr-20'>
              <h3 className="text-lg font-bold" style={{ marginLeft: '-10px' }}>
                {exercise.name}
              </h3>
            </div>
            {content === 'explorer' ? (
              <>
                <div className='mr-28'>
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
