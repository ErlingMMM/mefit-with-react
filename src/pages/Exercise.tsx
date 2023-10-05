import { useState } from 'react';
import ExerciseModal from '../components/modals/ExerciseModal';

function Exercise() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>Exercise</h1>
      <button onClick={openModal}>Open Modal</button>
      <ExerciseModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </div>
  );
}

export default Exercise;
