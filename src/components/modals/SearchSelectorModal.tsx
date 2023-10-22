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

            <div className='pr-24 py-2'>
              <div className="block pb-2 px-4 pr-10 rounded-md m-2 cursor-pointer">Sort by: {toTitleCase(selectedSearchOption)}</div>

              {filteredOptions.map((option) => (
                <>
                  <div className="absolute h-0.5 w-11/12 bg-gray-400 right-0 left-3"></div>

                  <button
                    key={option}
                    onClick={() => searchSelector(option)}
                    className="block pb-2 pt-3 px-4 rounded-md m-2 cursor-pointer"
                  >
                    {toTitleCase(option)}
                  </button>
                </>

              ))}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchSelectorModal;