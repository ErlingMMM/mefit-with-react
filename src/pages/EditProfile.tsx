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
          //intensity:UserIntensityPreference,
         // fitnessLvl: UserFitnessPreference,
          //timeframe:UserDurationTimeFrame,
        }))
        navigate('/');
        dispatch(setActiveComponent('profile'));
      } 
      const onClickBack = () => { 
        navigate('/');
    }
  

  return (
    <div className='bg-gray-500 h-screen flex flex-col justify-center items-center'>
      <h1 className='text-3xl font-bold mb-4 text-white'>Profile Editing Page</h1>

      <button onClick={onClickBack} className='bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded absolute top-4 left-4'>Back</button>
      <form className='bg-white p-8 rounded shadow-md'>
        <label className='block mb-2 text-gray-800' htmlFor="bio">Bio:</label>
        <input  onChange={handleBioChange} className='w-full p-2 mb-4 border rounded' type="text" id="bio" name="bio" />

        <label className='block mb-2 text-gray-800' htmlFor="age">Age:</label>
        <input  onChange={handleAgeChange} className='w-full p-2 mb-4 border rounded' type="text" id="age" name="age" />

        <label className='block mb-2 text-gray-800' htmlFor="height">Height:</label>
        <input onChange={handleHeightChange} className='w-full p-2 mb-4 border rounded' type="text" id="height" name="height" />

        <label className='block mb-2 text-gray-800' htmlFor="weight">Weight:</label>
        <input onChange={handleWeightChange} className='w-full p-2 mb-4 border rounded' type="text" id="weight" name="weight" />

        <label className='block mb-2 text-gray-800'>Gender:</label>
        <div className='flex items-center mb-4'>
          <input  onChange={handleRadioChange} className='mr-2' type="radio" id="male" name="gender" value="male" />
          <label className='text-gray-800' htmlFor="male">Male</label>

          <input onChange={handleRadioChange} className='mx-2' type="radio" id="female" name="gender" value="female" />
          <label className='text-gray-800' htmlFor="female">Female</label>

          <input onChange={handleRadioChange} className='mx-2' type="radio" id="other" name="gender" value="other" />
          <label className='text-gray-800' htmlFor="other" >Other</label>
        </div>

        <label className='block mb-2 text-gray-800'>Fitness preference:</label>
        <div className='flex items-center mb-4'>
          <input  onChange={handleRadio2Change} className='mr-2' type="radio" id="male" name="gender" value="0" />
          <label className='text-gray-800' htmlFor="male">Beginner</label>

          <input onChange={handleRadio2Change} className='mx-2' type="radio" id="female" name="gender" value="1" />
          <label className='text-gray-800' htmlFor="female">Intermediate</label>

          <input onChange={handleRadio2Change} className='mx-2' type="radio" id="other" name="gender" value="2" />
          <label className='text-gray-800' htmlFor="other" >Advanced</label>
        </div>

        <label className='block mb-2 text-gray-800'>Timeframe:</label>
        <div className='flex items-center mb-4'>
          <input  onChange={handleRadio3Change} className='mr-2' type="radio" id="male" name="gender" value="15" />
          <label className='text-gray-800' htmlFor="male">15 days</label>

          <input onChange={handleRadio3Change} className='mx-2' type="radio" id="female" name="gender" value="30" />
          <label className='text-gray-800' htmlFor="female">30 days</label>

          <input onChange={handleRadio3Change} className='mx-2' type="radio" id="other" name="gender" value="45" />
          <label className='text-gray-800' htmlFor="other" >45 days</label>
        </div>

        <label className='block mb-2 text-gray-800'>intensity (workouts per week - wpw)</label>
        <div className='flex items-center mb-4'>
          
          <input  onChange={handleRadio4Change} className='mr-2' type="radio" id="male" name="gender" value="1" />
          <label className='text-gray-800' htmlFor="male">1 wpw</label>

          <input onChange={handleRadio4Change} className='mx-2' type="radio" id="female" name="gender" value="2" />
          <label className='text-gray-800' htmlFor="female">2 wpw</label>

          <input onChange={handleRadio4Change} className='mx-2' type="radio" id="other" name="gender" value="3" />
          <label className='text-gray-800' htmlFor="other" >3 wpw</label>
          <br />
          <input onChange={handleRadio4Change} className='mx-2' type="radio" id="other" name="gender" value="4" />
          <label className='text-gray-800' htmlFor="other" >4 wpw</label>

          <input onChange={handleRadio4Change} className='mx-2' type="radio" id="other" name="gender" value="5" />
          <label className='text-gray-800' htmlFor="other" >5 wpw</label>
        </div>

        <button onClick={handleSave} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Save</button>

      </form>
    </div>
  );
}

export default EditProfile;
