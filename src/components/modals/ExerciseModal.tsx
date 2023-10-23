import { XIcon } from '@heroicons/react/outline';

function ExerciseModal({ isOpen, closeModal, exercise }: { isOpen: boolean, exercise: any; closeModal: () => void }) {
  const modalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); 
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto flex items-center justify-center"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity"></div>

          <div
            className="relative overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl max-h-screen"
            onClick={closeModal}
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-black" onClick={modalContentClick}>
              <XIcon
                className="h-6 w-6 text-black hover:bg-gray-200 hover:bg-opacity-50 rounded-full cursor-pointer absolute left-3 top-3"
                onClick={closeModal}
              />
              <h3
                className="font-bold text-2xl"
              >
                {exercise.name}
              </h3>
             

              <div className="mt-3 text-left">
                <div className="max-h-96 overflow-y-auto">
                  <img
                    src={exercise.image}
                    alt="Exercise"
                    className="max-w-full h-auto md:max-w-md md:h-auto mx-auto"
                  />
                  <h3
                    className="text-base font-semibold leading-6 text-black"
                    id="modal-title"
                  >
                    Description
                  </h3>
                  <div className="text-sm text-gray-500">
                    {exercise.description}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ExerciseModal;
