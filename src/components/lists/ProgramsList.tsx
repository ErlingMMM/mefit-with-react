
import React, { useState } from 'react';
import { truncateDescription } from '../utils/TruncateTextUtils';


interface Program {
  id: number;
  name: string;
  description: string;
  duration: number;
  difficulty: number;
  image: string;
}

interface ProgramsListProps {
  programs: Program[];
  onClick: (id: number) => void;
}

function ProgramsList({ programs, onClick }: ProgramsListProps) {
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false);




  return (
    <div className="flex justify-center items-center">
      <ul className="flex flex-wrap justify-center mx-9 md:grid md:gap-10 md:grid-cols-2">
        {programs.map((program) => (
          <li key={program.id} className="mb-6">
            <button onClick={() => onClick(program.id)}>
              <div>
                <img
                  src={program.image}
                  alt={program.name}
                  className="w-80 h-24 rounded-lg mx-auto object-cover object-top overflow-hidden hover:opacity-80"
                />
              </div>

              <div className="flex flex-col items-start ml-2">
                <h3 className="text-lg font-bold">
                  {program.name}
                </h3>
              </div>
            </button>
            <div className="w-80 text-start ml-2"> 
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