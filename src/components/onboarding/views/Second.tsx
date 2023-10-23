import React, { ChangeEvent, FormEvent, SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../Redux/Store';
import { RegisterUserOnboardingStatsAsync, SetUserFitnessLVL, setRegistrationBoolean, setUserTimesAWeek } from '../../../Redux/GenericSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

function Second() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [selectedOption, setSelectedOption] = useState('option1');
  const navigate = useNavigate();
  const registrationState = useSelector((state: any) => state.data.RegistrationValidation);
  const intensityLevelUser = useSelector((state: any) => state.data.userData.timesAWeek);
  const fintessLevelBruker = useSelector((state: any) => state.data.userData.fitnessPreference);
  const fintessTimeFrame = useSelector((state: any) => state.data.userData.DurationTimeFrame);
  


  const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
    dispatch(setUserTimesAWeek(event.target.value));

  }


  const handleRegistrerClick = () => {
    dispatch(RegisterUserOnboardingStatsAsync ({ intensity:intensityLevelUser, fitnessLvl:fintessLevelBruker
      ,timeframe:fintessTimeFrame}));
      dispatch(setRegistrationBoolean(true));
      navigate('/')
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4">
        <h1 className={`font-bold text-black text-2xl italic text-right`}>
      MeFit
    </h1>
    <br />
    <h1 className="text-lg font-bold mb-6 text-right">Choose your wanted<br /> intensity level</h1>

    <form className="">

        <div className="mb-2 p-4 rounded hover:scale-110 flex items-start">
            <input type="radio" id="beginnerIntensity" name="fitnessIntensity" value="1" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
                <label htmlFor="beginnerIntensity" className="text-lg font-bold">1 workout per week</label>
                <p>For a light exercise routine</p>
            </div>
        </div>

        <div className="mb-2 p-4 rounded hover:scale-110 flex items-start">
            <input type="radio" id="beginnerIntensity" name="fitnessIntensity" value="2" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
                <label htmlFor="beginnerIntensity" className="text-lg font-bold">2 workout per week</label>
                <p>For a balanced fitness regimen</p>
            </div>
        </div>

        <div className="mb-2 p-4 rounded hover:scale-110 flex items-start">
            <input type="radio" id="beginnerIntensity" name="fitnessIntensity" value="3" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
                <label htmlFor="beginnerIntensity" className="text-lg font-bold">3 workout per week</label>
                <p>For a moderate workout commitment</p>
            </div>
        </div>

        <div className="mb-2 p-4 rounded hover:scale-110 flex items-start">
            <input type="radio" id="beginnerIntensity" name="fitnessIntensity" value="4" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
                <label htmlFor="beginnerIntensity" className="text-lg font-bold">4 workout per week</label>
                <p>For a dedicated fitness schedule</p>
            </div>
        </div>

        <div className="mb-2 p-4 rounded hover:scale-110 flex items-start">
            <input type="radio" id="beginnerIntensity" name="fitnessIntensity" value="5" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
                <label htmlFor="beginnerIntensity" className="text-lg font-bold">5 workout per week</label>
                <p>For an intense and rigorous fitness routine</p>
            </div>
        </div>
    

    </form>
    <button className="underline" type="submit" onClick={handleRegistrerClick}>skip</button>

   </div>

);
};

export default Second