import { useState } from 'react';

function Progress() {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div>
      <button onClick={toggleDetails}>Progress details (click here) </button>
      {showDetails && (
        <div>
          <p>Progress details goes here</p>
        </div>
      )}
    </div>
  );
}

export default Progress;
