import { SearchIcon } from '@heroicons/react/outline';
import '../../../styles/SearchBar.css';


interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  placeholder: string;
}

function SearchBar({ searchQuery, setSearchQuery, placeholder }: SearchBarProps) {
  return (
    <div className="flex justify-center">
      <div className="external-input-style border-2 border-gray-300 bg-white h-12 w-10/12 rounded-3xl text-sm focus:outline-none inline-block relative">
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
          <SearchIcon className="w-4 h-4" />
        </div>
        <input
          type="text"
          placeholder={placeholder}
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
            e.target.placeholder = placeholder;
            if (e.target.parentElement) {
              e.target.parentElement.classList.remove("focused");
            }
          }}
          style={{ marginTop: '11px', marginLeft: '50px', width: '80%' }}
        />
      </div>
    </div>
  );
}

export default SearchBar;
