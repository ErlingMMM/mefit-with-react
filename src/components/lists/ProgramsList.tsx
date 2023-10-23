
import React, { useState } from 'react';
import { truncateDescription } from '../utils/TruncateTextUtils';


interface Program {
  id: number;
  name: string;
  description: string;
  duration: number;
  difficulty: number;
}

interface ProgramsListProps {
  programs: Program[];
  onClick: (id: number) => void;
}

function ProgramsList({ programs, onClick }: ProgramsListProps) {
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);


  // Define dummy images URLs
  const dummyImageUrls = [
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3269&q=80',
    'https://images.unsplash.com/photo-1434682881908-b43d0467b798?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3274&q=80',
    'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?ixlib=rb-4.0.3&ixid=M3wxM[…]dlfHx8fGVufDB8fHx8fA%3D%3D&auto.format&fit=crop&w=3270&q=80',
  ];

  // Helper function to get a random dummy image URL
  const getRandomDummyImageUrl = () => {
    const randomIndex = Math.floor(Math.random() * dummyImageUrls.length);
    return dummyImageUrls[randomIndex];
  };

  


  return (
    <div className="flex justify-center items-center">
      <ul className="flex flex-wrap justify-center mx-9 md:grid md:gap-10 md:grid-cols-2">
        {programs.map((program) => (
          <li key={program.id} className="mb-6">
            <button onClick={() => onClick(program.id)}>
              <div>
                <img
                  src={getRandomDummyImageUrl()}
                  alt={program.name}
                  className="w-80 h-24 rounded-lg mx-auto object-cover object-top overflow-hidden hover:opacity-80"
                />
              </div>

              <div className="flex flex-col items-start">
                <h3 className="text-lg font-bold">
                  {program.name}
                </h3>
              </div>
            </button>
            <div className="w-80 text-start"> 
              <p className={showFullDescription ? 'mt-4' : 'mt-2'}>
                {showFullDescription
                  ? program.description
                  : truncateDescription(program.description, 200)}
              </p>
              {program.description.length > 200 && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-blue-500 cursor-pointer"
                >
                  {showFullDescription ? 'Show Less' : 'Show More'}
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProgramsList;