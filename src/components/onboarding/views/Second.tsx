import React, { ChangeEvent, FormEvent, SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../Redux/Store';
import { RegisterUserOnboardingStatsAsync, SetUserFitnessLVL, setUserTimesAWeek } from '../../../Redux/GenericSlice';
import { AnyAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

function Second() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [selectedOption, setSelectedOption] = useState('option1');
  const navigate = useNavigate();
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
      navigate('/')
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 ">
    <h1 className="text-lg font-bold mb-6 self-end">Choose your wanted<br /> intensity level</h1>

    <form className="">

        <div className="mb-2 p-4 round hover:scale-110">
            <input type="radio" id="beginnerIntensity" name="fitnessIntensity" value="3" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
                <label htmlFor="beginnerIntensity" className="text-lg font-bold">3 times a week</label>
                <p>Perfect for deg som ønsker å komme form fort og som  vil spis kjøtt</p>
            </div>
        </div>

        <div className="mb-2 p-4 round hover:scale-110">
            <input type="radio" id="intermediateIntensity" name="fitnessIntensity" value="5" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
                <label htmlFor="intermediateIntensity" className="text-lg font-bold">5 times a week</label>
                <p>Perfect for deg som har tid til å gjete men også vil møte en som heter grete</p>
            </div>
        </div>
        <div className="mb-2 p-4 round hover:scale-110">
            <input type="radio" id="intermediateIntensity" name="fitnessIntensity" value="7" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <div>
                <label htmlFor="intermediateIntensity" className="text-lg font-bold">7 times a week</label>
                <p>Perfect for deg som har tid til å gjete men også vil møte en som heter grete</p>
            </div>
        </div>

    </form>
    <button className="underline" type="submit" onClick={handleRegistrerClick}>skip</button>

   </div>

);
};

export default Second