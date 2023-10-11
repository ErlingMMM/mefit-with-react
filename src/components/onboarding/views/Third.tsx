import { AnyAction } from '@reduxjs/toolkit';
import React, { SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../Redux/Store';
import { RegisterUserOnboardingStatsAsync, setUserTimeFrame, setUserTimesAWeek } from '../../../Redux/GenericSlice';

function Third() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [fornavn, setFornavn] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState('option1');
  const intensityLevelUser = useSelector((state: any) => state.data.userData.timesAWeek);
  const fintessLevelBruker = useSelector((state: any) => state.data.userData.fitnessPreference);
  const fintessTimeFrame = useSelector((state: any) => state.data.userData.DurationTimeFrame);
  

  const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
    dispatch(setUserTimeFrame(event.target.value));
    console.log(event.target.value)

  }
  
const handleRegistrerClick = () => {
  dispatch(RegisterUserOnboardingStatsAsync ({ intensity:intensityLevelUser, fitnessLvl:fintessLevelBruker
    ,timeframe:fintessTimeFrame}));
};
  console.log("user intensitylevel:",intensityLevelUser)
  console.log("user fitness level:",fintessLevelBruker)
  console.log("timeframe:",fintessTimeFrame )
  return (
    
    <div  className="flex flex-col items-center h-screen bg-white">
      <h1>Choose your timeframe:</h1>
      <form className="p-36 rounded justify-center ">

      <div className="mb-4 p-6 round hover:scale-110">
        <input type="radio" id="html" name="fav_language" value="15"  onChange={handleRadioChange} className="mr-2 h-8 w-8"/>
        <label htmlFor="html">15 days</label><br />
        </div>

        <div className="mb-4 p-6 round hover:scale-110">
        <input type="radio" id="css" name="fav_language" value="30"  onChange={handleRadioChange} className="mr-2 h-8 w-8"/>
        <label htmlFor="css">30 days</label><br />
        </div>

        <div className="mb-4 p-6 round hover:scale-110">
        <input type="radio" id="javascript" name="fav_language" value="45"  onChange={handleRadioChange} className="mr-2 h-8 w-8"/>
        <label htmlFor="javascript">45 days</label><br />
        </div>
      </form>
      <div className="mb-8 flex justify-center">
  <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleRegistrerClick} type="submit">registrer</button>
     </div>
    </div>
  );
}


export default Third