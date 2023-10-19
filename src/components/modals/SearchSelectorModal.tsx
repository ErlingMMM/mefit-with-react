import { XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSearchOption } from '../../Redux/GenericSlice';

function toTitleCase(str: string) {
  return str
    .split(/(?=[A-Z])/)
    .map(word => word.toLowerCase())
    .join(' ');
}

function SearchSelectorModal({ isOpen, closeModal, availableSearchOptions }: { isOpen: boolean, closeModal: () => void, availableSearchOptions: string[] }) {
  const dispatch = useDispatch();
  const selectedSearchOption = useSelector((state: any) => state.data.selectedSearchOption);

  const searchSelector = (option: string) => {
    dispatch(setSelectedSearchOption(option));
    closeModal();
  }

  const filteredOptions = availableSearchOptions.filter(option => option !== selectedSearchOption);

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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-20 transition-opacity"></div>

          <div className="relative overflow-hidden rounded-lg bg-white text-center shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl max-h-screen">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 text-black">
              <XIcon
                className="h-6 w-6 text-black hover:bg-gray-200 hover-bg-opacity-50 rounded-full cursor-pointer absolute left-3 top-3"
                onClick={closeModal}
              />
            </div>
            <div className="p-4">
              {filteredOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => searchSelector(option)}
                  className="block py-2 px-4 rounded-md m-2 cursor-pointer"
                >
                  {toTitleCase(option)}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchSelectorModal;
