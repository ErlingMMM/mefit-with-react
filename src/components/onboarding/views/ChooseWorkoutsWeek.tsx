import { SetStateAction, useState } from "react";
import { RegisterUserOnboardingStatsAsync, SetUserFitnessLVL, setRegistrationBoolean, setUserTimesAWeek } from '../../../Redux/GenericSlice';
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { AnyAction } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';

function ChooseWorkoutsWeek() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [selectedOption, setSelectedOption] = useState('1 workout per week');
  const navigate = useNavigate();
  const registrationState = useSelector((state: any) => state.data.RegistrationValidation);

  const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
    dispatch(setUserTimesAWeek(event.target.value));
}

  const handleSkipClick = () => {
    dispatch(setRegistrationBoolean(true));
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center overflow-x-hidden">
      <div className="-mb-10">
        <div className="text-right">
          <br />
          <br />
          <h1 className="text-xl font-bold mb-6 sm:text-2xl md:text-3xl w-64 sm:w-80 md:w-96">
            How many workouts do you want to do per week?
          </h1>
          <br />
        </div>
      </div>

      <div>
        <form className="">
          <div className="custom-radio  p-4 rounded flex items-start">
            <input type="radio" id="1workout" name="workoutsWeek" value="1 workout per week" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <label htmlFor="1workout" className="text-lg font-bold">1 workout per week</label>
            <p>For a light exercise routine.</p>
          </div>

          <div className="custom-radio p-4 rounded flex items-start">
            <input type="radio" id="2workouts" name="workoutsWeek" value="2 workouts per week" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <label htmlFor="2workouts" className="text-lg font-bold">2 workouts per week</label>
            <p>For a moderate workout commitment.</p>
          </div>

          <div className="custom-radio p-4 rounded flex items-start">
            <input type="radio" id="3workouts" name="workoutsWeek" value="3 workouts per week" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <label htmlFor="3workouts" className="text-lg font-bold">3 workouts per week</label>
            <p>For a dedicated fitness schedule.</p>
          </div>

          <div className="custom-radio p-4 rounded flex items-start">
            <input type="radio" id="4workouts" name="workoutsWeek" value="4 workouts per week" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <label htmlFor="4workouts" className="text-lg font-bold">4 workouts per week</label>
            <p>For a dedicated fitness schedule.</p>
          </div>

          <div className="custom-radio p-4 rounded flex items-start">
            <input type="radio" id="5workouts" name="workoutsWeek" value="5 workouts per week" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <label htmlFor="5workouts" className="text-lg font-bold">5 workouts per week</label>
            <p>For an intense and rigorous fitness routine.</p>
          </div>
        </form>
        <div className="text-center">
          <button className="underline" type="submit" onClick={handleSkipClick}>skip</button>
        </div>
      </div>
    </div>
  );
}

export default ChooseWorkoutsWeek;




