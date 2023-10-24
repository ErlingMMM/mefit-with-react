import { useDispatch, useSelector} from 'react-redux';
import { setSelectedSortOption } from '../../Redux/GenericSlice';

function SortSelectorModal({ isOpen, closeModal }: { isOpen: boolean, closeModal: () => void }) {
  const selectedSortOption = useSelector((state: any) => state.data.selectedSortOption);

  const dispatch = useDispatch();

  const sortSelector = (option: string) => {
    dispatch(setSelectedSortOption(option.toString()));
    closeModal();
  }

  const sortOptions = ["a-z", "z-a", "most recent", "least recent"];
 const filteredOptions = sortOptions.filter(option => option !== selectedSortOption);


  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 w-screen h-screen overflow-y-auto flex items-center justify-center"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
        >
          <div className="fixed inset-0"></div>

          <div className="relative overflow-hidden pr-10 sm:-left-96 -left-16 sm:mr-72 sm:-top-56 rounded-lg bg-white text-center shadow-xl transition-all max-h-screen">
            <div className="p-1">
            <div className="block px-4 rounded-md cursor-pointer text-gray-400">
                Sort by: {selectedSortOption}
              </div>
            {filteredOptions.map((option) => (
                <>
                  <button
                    key={option}
                    onClick={() => sortSelector(option)}
                    className="block px-2 rounded-md m-2 cursor-pointer hover:bg-gray-100"
                  >
                    {option}
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

export default SortSelectorModal;
