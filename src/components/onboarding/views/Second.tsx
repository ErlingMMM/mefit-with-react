import React, { ChangeEvent, FormEvent, SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../Redux/Store';
import { SetUserFitnessLVL, setUserTimesAWeek } from '../../../Redux/GenericSlice';
import { AnyAction } from '@reduxjs/toolkit';

function Second() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [selectedOption, setSelectedOption] = useState('option1');
  const fintensityLevelUser = useSelector((state: any) => state.data.userData.timesAWeek);
  


  const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
    dispatch(setUserTimesAWeek(event.target.value));

  }
  return (
    <div  className="flex flex-col items-center h-screen bg-white">
      <h1>Choose your wanted intensity level (times a week) :</h1>
<form className="p-48 rounded justify-center">
    <div className="mb-4 p-6 round hover:scale-125">
    <input type="radio" id="Beginner" name="fitnessLevel" value="3" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
    <label htmlFor="Beginner">3 times a week</label><br />
    </div>
    <div className="mb-4 p-6 round hover:scale-125">
    <input type="radio" id="Intermediate" name="fitnessLevel" value="5" onChange={handleRadioChange} className="mr-2 h-8 w-8"  />
    <label htmlFor="Intermediate">5 times a week</label><br />
    </div>
</form>
    </div>
  );
};


export default Second