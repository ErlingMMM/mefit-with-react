import { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import '../../../styles/SearchBar.css';
import SearchSelectorModal from '../../modals/SearchSelectorModal';
import { useSelector } from 'react-redux';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  placeholder: string;
}

function SearchBar({ searchQuery, setSearchQuery, placeholder }: SearchBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectedSearchOptionRedux = useSelector((state: any) => state.data.selectedSearchOption);

  const openModal = () => {
    setIsModalOpen(true);
  };

  // Convert selectedSearchOptionRedux to lowercase and add spaces between words
  const selectedSearchOption = selectedSearchOptionRedux
  .split(/(?=[A-Z])/)
  .map((word: string) => word.toLowerCase())
  .join(' ');


  return (
    <div className="flex justify-center">
      <div className="external-input-style border-2 border-gray-400 bg-white h-12 w-10/12 rounded-3xl text-sm focus:outline-none inline-block relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <SearchIcon className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder={placeholder + " by " + selectedSearchOption}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={(e) => {
            e.target.placeholder = "";
            if (e.target.parentElement) {
              e.target.parentElement.classList.add("focused");
            }
            e.target.style.caretColor = 'auto'; // Set caret color to auto for blinking cursor
          }}
          onBlur={(e) => {
            e.target.placeholder = placeholder + " by " + selectedSearchOption;
            if (e.target.parentElement) {
              e.target.parentElement.classList.remove("focused");
            }
          }}
          style={{ marginTop: '11px', marginLeft: '50px', width: '80%' }}
        />
        <button
          onClick={() => openModal()}
          className='absolute right-0 top-1/2 transform -translate-y-1/2'
          style={{ marginRight: '10px' }}
        >
          <DotsVerticalIcon className="w-6 h-6 text-gray-400 hover:text-black" />
        </button>
      </div>
      <SearchSelectorModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </div>
  );
}

export default SearchBar;
