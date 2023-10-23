import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import { SetUserFitnessLVL, setUserAge, setUserBio, setUserGender, setUserHeight, setUserTimeFrame, setUserTimesAWeek, setUserWeight, updateUserProfile } from '../Redux/GenericSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { setActiveComponent } from '../Redux/NavigationSlice';

function EditProfile() {
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const [selectedBio, setSelectedBio] = useState("");
    const navigate = useNavigate();
    const [selectedAge, setSelectedAge] = useState("");
    const [selectedHeight, setSelectedHeight] = useState("");
    const [selectedWeight, setSelectedWeight] = useState("");
    const [selectedGender, setSelectedGender] = useState("");


    const UserBio = useSelector((state: any) => state.data.userData.bio);
    const UserAge = useSelector((state: any) => state.data.userData.age);
    const UserHeight = useSelector((state: any) => state.data.userData.height);
    const UserWeight = useSelector((state: any) => state.data.userData.weight);
    const UserGender = useSelector((state: any) => state.data.userData.gender);
    const UserFitnessPreference = useSelector((state: any) => state.data.userData.fitnessPreference);
    const UserIntensityPreference = useSelector((state: any) => state.data.userData.timesAWeek);
    const UserDurationTimeFrame  = useSelector((state: any) => state.data.userData.DurationTimeFrame);

  
    const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedGender(event.target.value);
        dispatch(setUserGender(event.target.value));
      }

      const handleRadio2Change = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(SetUserFitnessLVL(event.target.value));
      }

      const handleRadio3Change = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setUserTimeFrame(event.target.value));
      }

      const handleRadio4Change = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setUserTimesAWeek(event.target.value));
      }



      const handleBioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedBio(event.target.value);
        dispatch(setUserBio(event.target.value));
    
      }
      const handleAgeChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedAge(event.target.value);
        dispatch(setUserAge(event.target.value));
    
      }
      const handleHeightChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedHeight(event.target.value);
        dispatch(setUserHeight(event.target.value));
    
      }
      const handleWeightChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setSelectedWeight(event.target.value);
        dispatch(setUserWeight(event.target.value));
  
      }


      
      const handleSave = () => {
        dispatch(updateUserProfile({
          bio: UserBio,
          age: UserAge,
          height: UserHeight,
          weight: UserWeight,
          gender: UserGender,
          intensity:UserIntensityPreference,
          fitnessLvl: UserFitnessPreference,
         // timeframe:UserDurationTimeFrame,
        }))
        navigate('/');
        dispatch(setActiveComponent('profile'));
      } 
      const onClickBack = () => { 
        navigate('/');
    }
  

  return (
    <div className='bg-white h-screen flex flex-col justify-center items-center'>
      <h1
        className={`font-bold text-black text-2xl italic text-right absolute top-6 right-5`}
      >
        MeFit
      </h1>
     <h1 className='text-3xl sm:text-4xl font-bold mb-4 text-black justify-end'>edit info </h1>
     <button onClick={onClickBack} className='bg-custom-green text-gray-800 font-bold py-2 px-4 rounded absolute top-4 left-4 sm:top-8 sm:left-8'>Back</button>

      <form className="bg-white p-8 rounded">
        <label className='block mb-2 text-black font-bold ' htmlFor="bio">Bio:</label>
        <input  onChange={handleBioChange} className='w-full p-2 mb-4 border rounded' type="text" id="bio" name="bio" />

        <label className='block mb-2 text-gray-800 font-bold' htmlFor="age">Age:</label>
        <input  onChange={handleAgeChange} className='w-full p-2 mb-4 border rounded' type="text" id="age" name="age" />

        <label className='block mb-2 text-gray-800 font-bold' htmlFor="height">Height:</label>
        <input onChange={handleHeightChange} className='w-full p-2 mb-4 border rounded' type="text" id="height" name="height" />

        <label className='block mb-2 text-gray-800 font-bold' htmlFor="weight">Weight:</label>
        <input onChange={handleWeightChange} className='w-full p-2 mb-4 border rounded' type="text" id="weight" name="weight" />

        <label className='block mb-2 text-gray-800 font-bold text-xl'>Gender:</label>
        <div className='flex items-center mb-4'>
          <input  onChange={handleRadioChange} className='mr-2 ' type="radio" id="male" name="gender" value="male" />
          <label className='text-gray-800   text-xl' htmlFor="male">Male</label>

          <input onChange={handleRadioChange} className='mx-2 font-bold' type="radio" id="female" name="gender" value="female" />
          <label className='text-gray-800  text-xl' htmlFor="female">Female</label>

          <input onChange={handleRadioChange} className='mx-2 font-bold' type="radio" id="other" name="gender" value="other" />
          <label className='text-gray-800   text-xl' htmlFor="other" >Other</label>
        </div>

        <label className='block mb-2 text-gray-800 font-bold text-xl'>Fitness preference:</label>
        <div className='flex items-center mb-4'>
          <input  onChange={handleRadio2Change} className='mr-2' type="radio" id="male" name="gender" value="Beginner" />
          <label className="text-gray-800 text-xl" htmlFor="male">Beginner</label>

          <input onChange={handleRadio2Change} className='mx-2' type="radio" id="female" name="gender" value="Intermediate" />
          <label className="text-gray-800  text-xl" htmlFor="female">Intermediate</label>

          <input onChange={handleRadio2Change} className='mx-2' type="radio" id="other" name="gender" value="Expert" />
          <label className="text-gray-800 text-xl"  htmlFor="other" >Advanced</label>
        </div>

        <label className='block mb-2 text-gray-800 font-bold text-xl'>Timeframe:</label>
        <div className='flex items-center mb-4'>
          <input  onChange={handleRadio3Change} className='mr-2' type="radio" id="male" name="gender" value="15" />
          <label className='text-gray-800  text-xl' htmlFor="male">15 days</label>

          <input onChange={handleRadio3Change} className='mx-2' type="radio" id="female" name="gender" value="30" />
          <label className='text-gray-800  text-xl' htmlFor="female">30 days</label>

          <input onChange={handleRadio3Change} className='mx-2' type="radio" id="other" name="gender" value="45" />
          <label className='text-gray-800  text-xl' htmlFor="other" >45 days</label>
        </div>

        <label className='block mb-2 text-gray-800 font-bold text-xl'>intensity (workouts per week - wpw)</label>
        <div className='flex items-center mb-4'>
          
          <input  onChange={handleRadio4Change} className='mr-2' type="radio" id="male" name="gender" value="1" />
          <label className='text-gray-800 text-xl' htmlFor="male">1 a/w </label>

          <input onChange={handleRadio4Change} className='mx-2' type="radio" id="female" name="gender" value="2" />
          <label className='text-gray-800  text-xl' htmlFor="female">2 a/w  </label>

          <input onChange={handleRadio4Change} className='mx-2' type="radio" id="other" name="gender" value="3" />
          <label className='text-gray-800  text-xl' htmlFor="other" >3 a/w </label>
          <br />
          <input onChange={handleRadio4Change} className='mx-2' type="radio" id="other" name="gender" value="4" />
          <label className='text-gray-800 text-xl' htmlFor="other" >4  a/w</label>

          <input onChange={handleRadio4Change} className='mx-2' type="radio" id="other" name="gender" value="5" />
          <label className='text-gray-800  text-xl' htmlFor="other" >5  a/w</label>
        </div>

        <button onClick={handleSave} className="w-full bg-custom-green text-white font-bold py-2 px-4 rounded-lg focus:ring focus:ring-green-200" type="submit">Save</button>

      </form>
    </div>
  );
} 

export default EditProfile;
