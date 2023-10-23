import { SetStateAction, useState } from "react";
import { RegisterUserOnboardingStatsAsync, SetUserFitnessLVL, setRegistrationBoolean } from "../../../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { AnyAction } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';

function First() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
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
    <div className="min-h-screen flex flex-col justify-center items-center p-4 overflow-hidden">
    <div className="mt-10">
  <div>
    <h1 className={`font-bold text-black text-2xl italic text-center`}>
      MeFit
    </h1>
    <br />
    <h1 className="text-lg font-bold mb-6 text-right ">What is your<br />current fitness<br />level?</h1>
  </div>
</div>
     

     <div>
      
     </div>

    <form className="">
        <div className="mb-2 p-4 rounded hover:scale-110 flex items-start">
            <input type="radio" id="Beginner" name="fitnessLevel" value="Beginner" onChange={handleRadioChange} className="mr-2 h-8 w-8"  />
            <div>
            <label htmlFor="Beginner" className="text-lg font-bold">Beginner</label>
            <p>Perfect for fitness newcomers.<br />
            Covers fundamental exercises <br />
            and techniques.</p>
            </div> 
        </div>

        <div className="mb-2 p-4 rounded hover:scale-110 flex items-start">
    <input type="radio" id="Intermediate" name="fitnessLevel" value="Intermediate" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
    <div>
        <label htmlFor="Intermediate" className="text-lg font-bold inline-block mb-1">Intermediate</label>
        <p className="mb-0">For users with some prior fitness experience.<br />
        Introduces more challenging workouts <br /> and exercises and techniques.</p>
    </div>

    </div>

    <div className="mb-2 p-4 rounded hover:scale-110 flex items-start">
            <input type="radio" id="Expert" name="fitnessLevel" value="Expert" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
            <label htmlFor="Expert" className="text-lg font-bold">Expert</label>
            <p>For seasoned fitness enthusiasts,<br />
            the expert level offers advanced workouts <br />
            and intense routines.</p>
            </div>
        </div>

    </form>
    <button className="underline" type="submit" onClick={handleRegistrerClick}>skip</button>


</div>


  

  );
};

export default First;

