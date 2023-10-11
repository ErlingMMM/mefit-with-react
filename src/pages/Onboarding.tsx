import { useState } from "react";
import ContentSwitch from "../components/onboarding/ContentSwitch";

function Onboarding() {
  const [activeComponent, setActiveComponent] = useState(1);

  const handleNextClick = () => {
    if (activeComponent < 3) {
      setActiveComponent((prevActive) => prevActive + 1);
    }
  };

  const handlePrevClick = () => {
    if (activeComponent > 1) {
      setActiveComponent((prevActive) => prevActive - 1);
    }
  };

  return (
    <div className="p-4  bg-white"> {/* Legg til padding for avstand */}
    <div className="text-xl font-bold mb-4">Onboarding</div> {/* Legg til ønsket tekststil og margin */}
    <ContentSwitch activeComponent={activeComponent} />
    <div className="flex justify-center"> {/* Legg til flex og juster innholdet i midten */}
      <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-screen" onClick={handlePrevClick}>
        Previous
      </button> {/* Legg til Tailwind CSS klasser for å style knappen */}
      <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-screen" onClick={handleNextClick}>
        Next
      </button> {/* Legg til Tailwind CSS klasser for å style knappen */}
    </div>
        <button onClick={handleNextClick}>Skip</button>
  </div>
  );
}

export default Onboarding;
