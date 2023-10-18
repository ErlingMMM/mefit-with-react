import React from 'react';
import Bars3BottomLeftIconSVG from '../../../../SVG/Bars3BottomLeftIcon';

const handleClick = () => {
  console.log("Hello, World!");
};

function SortButton() {
  return (
    <>
        <button onClick={handleClick} className="flex items-center  text-gray-400">
          <div dangerouslySetInnerHTML={{ __html: Bars3BottomLeftIconSVG }} />
          <span className='mb-1'>A-Z</span>
        </button>
    </>
  );
}

export default SortButton;
