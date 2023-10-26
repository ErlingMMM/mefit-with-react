import { SetStateAction, useState } from "react";
import { RegisterUserOnboardingStatsAsync, SetUserFitnessLVL, setRegistrationBoolean } from "../../../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { AnyAction } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';

function ChooseDifficulty() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [selectedOption, setSelectedOption] = useState('Beginner');
  const navigate = useNavigate();
  const intensityLevelUser = useSelector((state: any) => state.data.userData.timesAWeek);
  const fintessLevelBruker = useSelector((state: any) => state.data.userData.fitnessPreference);
  const fintessTimeFrame = useSelector((state: any) => state.data.userData.DurationTimeFrame);
  const registrationState = useSelector((state: any) => state.data.RegistrationValidation);
  
  
  


  const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
    dispatch(SetUserFitnessLVL(event.target.value));

  }
  const handleRegistrerClick = () => {
    dispatch(RegisterUserOnboardingStatsAsync ({ intensity:intensityLevelUser, fitnessLvl:fintessLevelBruker
      ,timeframe:fintessTimeFrame}));
      dispatch(setRegistrationBoolean(true));
      navigate('/')
  };


  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 overflow-hidden">
      {/* ... */}
      <form className="">
        <div className="custom-radio">
          <input type="radio" id="Beginner" name="fitnessLevel" value="Beginner" onChange={handleRadioChange} checked={selectedOption === 'Beginner'} />
          <label htmlFor="Beginner" className="text-lg font-bold">Beginner</label>

          <input type="radio" id="Intermediate" name="fitnessLevel" value="Intermediate" onChange={handleRadioChange} checked={selectedOption === 'Intermediate'} />
          <label htmlFor="Intermediate" className="text-lg font-bold">Intermediate</label>

          <input type="radio" id="Expert" name="fitnessLevel" value="Expert" onChange={handleRadioChange} checked={selectedOption === 'Expert'} />
          <label htmlFor="Expert" className="text-lg font-bold">Expert</label>
        </div>
      </form>
    </div>
  );
}

export default ChooseDifficulty;

