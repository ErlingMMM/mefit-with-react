import { SearchIcon } from '@heroicons/react/outline';
import '../../../styles/Explorer.css'


interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <div className="relative">
      <div className="external-input-style border-2 border-gray-300 bg-white h-12 w-10/12 rounded-3xl text-sm focus:outline-none inline-block">
        <input
          type="text"
          placeholder="Search exercises"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={(e) => {
            e.target.placeholder = "";
            if (e.target.parentElement) {
              e.target.parentElement.classList.add("focused");
            }
          }}
          onBlur={(e) => {
            e.target.placeholder = "Search exercises";
            if (e.target.parentElement) {
              e.target.parentElement.classList.remove("focused");
            }
          }}
          style={{ marginTop: '11px', marginRight: '60px' }}
        />
        <div className="absolute left-12 top-4 text-gray-400">
          <SearchIcon className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
