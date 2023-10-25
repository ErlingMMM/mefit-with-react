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
    <div className="bg-white overflow-hidden fixed bottom-0 left-0 w-screen">
    <ContentSwitch activeComponent={activeComponent} />
    <div className="w-screen flex justify-center">
        <button className="bg-black text-white font-bold py-3 px-4 rounded focus:shadow-outline w-screen " onClick={handlePrevClick}>
            Previous
        </button> 
        <button className="bg-[#a3e635] hover:bg-black text-black font-bold py-6 px-4 rounded focus:shadow-outline w-screen " onClick={handleNextClick}>
            Next
        </button> 
    </div> 
</div>



      
    
  );
}

export default Onboarding;
