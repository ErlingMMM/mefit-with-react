import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import { RegisterUserOnboardingStatsAsync, SetUserFitnessLVL, SetuserFName, setRegistrationBoolean } from "../../../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { AnyAction } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';

function First() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [fornavn, setFornavn] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState('option1');
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
    <div className="min-h-screen flex flex-col justify-center items-center p-4 ">
      <h1 className="text-lg font-bold mb-6 self-end">What is your<br />current fitness<br />level?</h1>

    <form className="">
        <div className="mb-2 p-4 rounded hover:scale-110">
            <input type="radio" id="Beginner" name="fitnessLevel" value="Beginner" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
            <label htmlFor="Beginner" className="text-lg font-bold">Beginner</label>
            <p>Perfect for fitness newcomers.<br />
            Covers fundamental exercises<br />
            and techniques.</p>
            </div> 
        </div>

        <div className="mb-2 p-4 rounded hover:scale-110">
            <input type="radio" id="Intermediate" name="fitnessLevel" value="Intermediate" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
            <label htmlFor="Intermediate" className="text-lg font-bold">Intermediate</label>
            <p>For users with some prior fitness experience.<br />
            Covers fundamental exercises<br />
            and techniques.</p>
            </div>
        </div>

        <div className="mb-2 p-4 rounded hover:scale-110">
            <input type="radio" id="Expert" name="fitnessLevel" value="Expert" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
            <label htmlFor="Expert" className="text-lg font-bold">Expert</label>
            <p>For users with significant prior fitness experience.<br />
            Covers advanced exercises<br />
            and techniques.</p>
            </div>
        </div>

    </form>
    <button className="underline" type="submit" onClick={handleRegistrerClick}>skip</button>


</div>


  

  );
};

export default First;

