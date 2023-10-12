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

  return (
    <>
    <div className='overflow-x-hidden	'>
    <div>Onboarding</div>
      <ContentSwitch activeComponent={activeComponent} />
      <div>
      <button onClick={handlePrevClick}>Previous</button>
        <button onClick={handleNextClick}>Next</button>
        <button onClick={handleSkip}>Skip</button>
        </div>
    </div>
   
    </>
  );
}

export default Onboarding;
