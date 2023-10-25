import { XIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { setActiveComponent } from '../../Redux/NavigationSlice';



function SubscribeModal({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) {
  const dispatch = useDispatch();
  const modalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  function navigateDashboard() {
    dispatch(setActiveComponent('explorer'));
  }




  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto flex items-center justify-center"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>

          <div className={`relative rounded-2xl overflow-hidden bg-white text-center shadow-xl transition-all max-h-screen`}>
            <div className="bg-white pb-5 sm:p-6 sm:pb-4 text-black" onClick={modalContentClick}>
              <XIcon
                className="h-6 w-6 text-black hover:bg-gray-200 hover:bg-opacity-50 rounded-full cursor-pointer absolute left-3 top-3"
                onClick={closeModal}
              />
             

              <div className="sm:pt-4 pt-7 text-center">
               
                  <h1>Congratulations! You have subscribed to the program</h1>
              
              </div>

        
            </div>
            <div className="bg-custom-green py-6 px-4 hover:opacity-90">
              <button
                onClick={() => navigateDashboard()}
                className="text-black w-full px-4 font-bold text-lg sm:py-2 py-6 rounded-lg hover:text-gray-600"
              >
                Go back to explorer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SubscribeModal;

