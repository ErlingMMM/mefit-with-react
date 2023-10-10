import { XIcon } from '@heroicons/react/outline';

function ExerciseModal({ isOpen, closeModal, exercise }: { isOpen: boolean, exercise: any; closeModal: () => void }) {
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="relative overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl max-h-screen">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-black">
              <XIcon
                className="h-6 w-6 text-black hover:bg-gray-200 hover:bg-opacity-50 rounded-full cursor-pointer absolute left-3 top-3"
                onClick={closeModal}
              />
              {exercise.name}

              <div className="mt-3 text-left">
                <div className="max-h-96 overflow-y-auto">
                  <img
                    src="https://health.clevelandclinic.org/wp-content/uploads/sites/3/2022/04/exerciseHowOften-944015592-770x533-1-745x490.jpg"
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
                  <div>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ultrices molestie nulla ac tempus. Vivamus vestibulum metus diam, vel malesuada tellus mattis pharetra. Donec lacinia accumsan molestie. In commodo lobortis libero, a volutpat augue rutrum eu. Morbi posuere diam a nunc interdum pellentesque. Ut at erat at ipsum semper faucibus. Pellentesque scelerisque iaculis malesuada. Etiam scelerisque, quam sit amet varius semper, dolor dolor aliquam tellus, in rutrum libero lacus vitae turpis. Pellentesque auctor dolor vel mi lacinia, in aliquet nisi bibendum. Mauris eget molestie augue. Sed dignissim, elit ut vehicula condimentum, tellus dui aliquet tortor, ac iaculis ligula lectus non ante. Donec condimentum egestas risus, non rhoncus metus blandit non. Aliquam erat volutpat. In in dictum sem, in vulputate est.
                    </p>
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
