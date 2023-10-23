import { useState } from 'react';
import Bars3BottomLeftIconSVG from '../../../../SVG/Bars3BottomLeftIcon';
import SortSelectorModal from '../../../modals/SortSelectorModal';
import { useSelector } from 'react-redux';


function SortButton() {
  const selectedSortOption = useSelector((state: any) => state.data.selectedSortOption);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button onClick={handleClick} className="flex items-center  text-gray-400">
        <div dangerouslySetInnerHTML={{ __html: Bars3BottomLeftIconSVG }} />
        <span className='mb-1'>Sort by: {selectedSortOption}</span>
      </button>
      <SortSelectorModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />
    </>
  );
}

export default SortButton;


