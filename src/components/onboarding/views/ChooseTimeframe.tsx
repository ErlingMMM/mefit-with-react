import { SetStateAction, useState } from "react";
import { SetUserFitnessLVL, setRegistrationBoolean } from "../../../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { AnyAction } from "@reduxjs/toolkit";
import { useNavigate } from 'react-router-dom';

function ChooseTimeframe() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [selectedOption, setSelectedOption] = useState('15');
  const navigate = useNavigate();
  const intensityLevelUser = useSelector((state: any) => state.data.userData.timesAWeek);
  const fintessTimeFrame = useSelector((state: any) => state.data.userData.DurationTimeFrame);
  const registrationState = useSelector((state: any) => state.data.RegistrationValidation);

  const handleRadioChange = (event: { target: { value: SetStateAction<string> }; }) => {
    setSelectedOption(event.target.value);
  }

  const handleRegistrerClick = () => {
    dispatch(SetUserFitnessLVL(selectedOption));
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
            Choose your<br />timeframe
          </h1>
        </div>
      </div>

      <div>
        <form className="">
          <div className="custom-radio mb-2 p-4 rounded flex items-start">
            <input type="radio" id="15" name="timeframe" value="15" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <label htmlFor="15" className="text-lg font-bold">15 days</label>
            <p>Kickstart your fitness journey with our 15-day program. <br />
              In just over two weeks, you'll build a foundation for a healthier, more active lifestyle.</p>
          </div>

          <div className="custom-radio mb-2 p-4 rounded flex items-start">
            <input type="radio" id="30" name="timeframe" value="30" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <label htmlFor="30" className="text-lg font-bold inline-block mb-1">30 days</label>
            <p className="mb-0">The 30-day program is designed for those seeking significant progress and sustainable results.</p>
          </div>

          <div className="custom-radio mb-2 p-4 rounded flex items-start">
            <input type="radio" id="60" name="timeframe" value="60" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
            <label htmlFor="60" className="text-lg font-bold">60 days</label>
            <p>For a comprehensive fitness transformation, the 60-day program is the way to go. Over a month and a half, you'll undergo a holistic fitness journey.</p>
          </div>
        </form>
        <div className="text-center">
          <button className="underline" type="submit" onClick={handleRegistrerClick}>skip</button>
        </div>
      </div>
    </div>
  );
}

export default ChooseTimeframe;
