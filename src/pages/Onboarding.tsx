import { useState } from "react";
import ContentSwitch from "../components/onboarding/ContentSwitch";
import { RegisterUserOnboardingStatsAsync, setRegistrationBoolean } from "../Redux/GenericSlice";
import { RootState } from "../Redux/Store";
import { AnyAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { useNavigate } from 'react-router-dom';

function Onboarding() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [activeComponent, setActiveComponent] = useState(1);
  const intensityLevelUser = useSelector((state: any) => state.data.userData.timesAWeek);
  const fintessLevelBruker = useSelector((state: any) => state.data.userData.fitnessPreference);
  const fintessTimeFrame = useSelector((state: any) => state.data.userData.DurationTimeFrame);
  const registrationState = useSelector((state: any) => state.data.RegistrationValidation);
  const navigate = useNavigate();
  const handleNextClick = () => {
    if (activeComponent < 3) {
      
      setActiveComponent((prevActive) => prevActive + 1);
    }
  };
  const handleRegistrerClick = () => {
    dispatch(RegisterUserOnboardingStatsAsync ({ intensity:intensityLevelUser, fitnessLvl:fintessLevelBruker
      ,timeframe:fintessTimeFrame}));
      dispatch(setRegistrationBoolean(true));
      navigate('/')
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
            <button className="bg-custom-black hover:bg-opacity-95 text-white font-bold py-3 px-4 rounded focus:shadow-outline w-screen" onClick={handlePrevClick}>
                Previous
            </button>
            {activeComponent === 3 ? (
               <button className="bg-custom-green hover:bg-custom-green-hover text-black font-bold py-6 px-4 rounded focus:shadow-outline w-screen" onClick={handleRegistrerClick}>
               Register
           </button>
            ) : (
                <button className="bg-custom-green hover:bg-custom-green-hover text-black font-bold py-6 px-4 rounded focus:shadow-outline w-screen" onClick={handleNextClick}>
                    Next
                </button>
            )}
        </div>
    </div>
);

}

export default Onboarding;
