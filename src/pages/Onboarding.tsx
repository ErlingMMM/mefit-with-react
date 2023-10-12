import { useState } from "react";
import ContentSwitch from "../components/onboarding/ContentSwitch";

function Onboarding() {
  const [activeComponent, setActiveComponent] = useState(1);

  const handleNextClick = () => {
    if (activeComponent < 3) {
      setActiveComponent((prevActive) => prevActive + 1);
    }
  };

  const handleSkip = () => {
    //TODO: Add logic to skip onboarding
    };

  const handlePrevClick = () => {
    if (activeComponent > 1) {
      setActiveComponent((prevActive) => prevActive - 1);
    }
  };
  /*
  */
 

  return (
    <div className="p-0 bg-white ">

  
    <ContentSwitch activeComponent={activeComponent} />
    <div className="w-screen flex justify-center">
    <button className="bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:shadow-outline w-screen" onClick={handlePrevClick}>
        Previous
    </button> 
    <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded focus:shadow-outline w-screen" onClick={handleNextClick}>
        Next
    </button> 
</div>

        
  </div>
    
  );
}

export default Onboarding;
