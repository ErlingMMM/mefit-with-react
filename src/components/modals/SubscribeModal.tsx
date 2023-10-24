import { XIcon } from '@heroicons/react/outline';


function SubscribeModal({ isOpen, closeModal, workout }: { isOpen: boolean, workout: any, closeModal: () => void }) {
    const modalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
      };
   
  
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
  
            <div className="relative overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all max-h-screen">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-black" onClick={modalContentClick}>
              <XIcon
                className="h-6 w-6 text-black hover:bg-gray-200 hover:bg-opacity-50 rounded-full cursor-pointer absolute left-3 top-3"
                onClick={closeModal}
              />
  
                <button
                  onClick={() => closeModal()}
                  className="block pb-2 pt-3 px-4 rounded-md m-2 cursor-pointer hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  
  export default SubscribeModal;
  