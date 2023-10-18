import { XIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
//import { setSelectedSearchOption } from '../../Redux/orderLists/SearchOptionSlice';

function SortSelectorModal({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) {
  const dispatch = useDispatch();

  const searchSelector = (option: string) => {
   // dispatch(setSelectedSearchOption(option.toString()));
    closeModal();
  }

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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-0 transition-opacity"></div>

          <div className="relative overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl max-h-screen">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-black">
              <XIcon
                className="h-6 w-6 text-black hover:bg-gray-200 hover:bg-opacity-50 rounded-full cursor-pointer absolute left-3 top-3"
                onClick={closeModal}
              />
            </div>
            <div className="p-4">
              <button onClick={() => searchSelector("muscleGroup")}>Muscle Group</button>
              <button onClick={() => searchSelector("difficulty")}>Difficulty</button>
              <button onClick={() => searchSelector("name")}>Name</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SortSelectorModal;
