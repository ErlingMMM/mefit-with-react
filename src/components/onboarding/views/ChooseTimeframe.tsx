import { AnyAction } from '@reduxjs/toolkit';
import React, { SetStateAction, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../Redux/Store';
import { RegisterUserOnboardingStatsAsync, setRegistrationBoolean, setUserTimeFrame, setUserTimesAWeek } from '../../../Redux/GenericSlice';
import { useNavigate } from 'react-router-dom';


function ChooseTimeframe() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [selectedOption, setSelectedOption] = useState('option1');
  const intensityLevelUser = useSelector((state: any) => state.data.userData.timesAWeek);
  const fintessLevelBruker = useSelector((state: any) => state.data.userData.fitnessPreference);
  const fintessTimeFrame = useSelector((state: any) => state.data.userData.DurationTimeFrame);
  const navigate = useNavigate();


  const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
    dispatch(setUserTimeFrame(event.target.value));
    console.log(event.target.value)

  }
  //  <button className="bg-black hover:bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleRegistrerClick} type="submit">registrer</button>
const handleRegistrerClick = () => {
  dispatch(RegisterUserOnboardingStatsAsync ({ intensity:intensityLevelUser, fitnessLvl:fintessLevelBruker
    ,timeframe:fintessTimeFrame}));
    dispatch(setRegistrationBoolean(true));
    navigate('/')
};

  console.log("user intensitylevel:",intensityLevelUser)
  console.log("user fitness level:",fintessLevelBruker)
  console.log("timeframe:",fintessTimeFrame )

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 mt-11">
      <br />
      <br />
      <br />
      <h1 className={`font-bold text-black text-2xl italic text-right`}>
      MeFit
    </h1>
      <h1 className="text-lg font-bold mb-6 text-right">Choose your timeframe</h1>
      <form className="">

      <div className="mb-2 p-4 rounded flex items-start">
        <input type="radio" id="html" name="fav_language" value="15"  onChange={handleRadioChange} className="mr-2 h-8 w-8"/>
         <div>
        <label  className="text-lg font-bold">15 days</label><br />
        <p>Kickstart your fitness journey with our 15-day program. <br />
           In just over two weeks, you'll build a foundation for a healthier, more active lifestyle.</p>
         </div>
        </div>

        <div className="mb-2 p-4 rounded flex items-start">
        <input type="radio" id="css" name="fav_language" value="30"  onChange={handleRadioChange} className="mr-2 h-8 w-8"/>
        <div>
        <label   className="text-lg font-bold" >30 days</label><br />
        <p>The 30-day program is designed for those seeking significant progress and sustainable results.</p>
         </div>
        </div>

        <div className="mb-2 p-4 rounded flex items-start">
        <input type="radio" id="javascript" name="fav_language" value="60"  onChange={handleRadioChange} className="mr-2 h-8 w-8"/>
         <div>
        <label className="text-lg font-bold">60 days</label><br />
        <p>For a comprehensive fitness transformation, the 60-day programs is the way to go. Over a month and a half, you'll undergo a holistic fitness journey.</p>
         </div>
        </div>
      </form>
      <div className="mb-8 flex justify-center">
     </div>
    </div>
  );
}


export default ChooseTimeframe