import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import { SetUserFitnessLVL, setUserAge, setUserBio, setUserGender, setUserHeight, setUserPicture, setUserTimeFrame, setUserTimesAWeek, setUserWeight, updateUserProfile } from '../Redux/GenericSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import { setActiveComponent } from '../Redux/NavigationSlice';
import { useTheme } from '../styles/ThemeContext';
import { useEffect } from 'react';
function EditProfile() {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);
  
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
    const UserPicture =  useSelector((state: any) => state.data.userData.picture);

  
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
      const handleImageChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setUserPicture(event.target.value));
        console.log(UserPicture)
  
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
          picture:UserPicture,
        }))
        navigate('/');
        dispatch(setActiveComponent('profile'));
      } 
  
  

  return (
    <div className='bg-gray w-screen h-screen flex flex-col justify-center items-center'>
      <h1
        className={`font-bold text-black text-2xl italic text-right absolute top-6`}
      >
        MeFit
      </h1>
     <br />
     <br />
     <div className="sm:w-full md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">

      <form className="bg-gray p-8 rounded">
        <label className='block mb-2 text-black font-bold ' htmlFor="bio">Bio:</label>
        <input  onChange={handleBioChange} className='w-full p-2 mb-4 border rounded' type="text" id="bio" name="bio" />

        <label className='block mb-2 text-gray-800 font-bold' htmlFor="age">Age:</label>
        <input  onChange={handleAgeChange} className='w-full p-2 mb-4 border rounded' type="text" id="age" name="age" />

        <label className='block mb-2 text-gray-800 font-bold' htmlFor="height">Height:</label>
        <input onChange={handleHeightChange} className='w-full p-2 mb-4 border rounded' type="text" id="height" name="height" />

        <label className='block mb-2 text-gray-800 font-bold' htmlFor="weight">Weight:</label>
        <input onChange={handleWeightChange} className='w-full p-2 mb-4 border rounded' type="text" id="weight" name="weight" />

        
        <label className='block mb-2 text-gray-800 font-bold' htmlFor="weight">image:</label>
        <input onChange={handleImageChange} className='w-full p-2 mb-4 border rounded' type="text" id="weight" name="image" />


        <label className='block mb-2 text-gray-800 font-bold text-xl'>Gender:</label>
        <div className='flex items-center mb-4'>
          <input  onChange={handleRadioChange} className='mr-2 ' type="radio" id="male" name="gender" value="male" />
          <label className='text-gray-800   text-xl' htmlFor="male">Male</label>

          <input onChange={handleRadioChange} className='mx-2 font-bold' type="radio" id="female" name="gender" value="female" />
          <label className='text-gray-800  text-xl' htmlFor="female">Female</label>

          <input onChange={handleRadioChange} className='mx-2 font-bold' type="radio" id="other" name="gender" value="other" />
          <label className='text-gray-800   text-xl' htmlFor="other" >Other</label>
        </div>

        <div className='block mb-4'>
  <label className='block mb-2 text-gray-800 font-bold text-xl'>Fitness preference:</label>
  <div className='flex flex-col items-start'>
    <div className='mb-2'>
      <input onChange={handleRadio2Change} type="radio" id="male" name="gender" value="Beginner" />
      <label className="text-gray-800 text-xl ml-2" htmlFor="male">Beginner</label>
    </div>
    
    <div className='mb-2'>
      <input onChange={handleRadio2Change} type="radio" id="female" name="gender" value="Intermediate" />
      <label className="text-gray-800 text-xl ml-2" htmlFor="female">Intermediate</label>
    </div>
    
    <div className='mb-2'>
      <input onChange={handleRadio2Change} type="radio" id="other" name="gender" value="Expert" />
      <label className="text-gray-800 text-xl ml-2" htmlFor="other">Expert</label>
    </div>
  </div>
</div>




        <button onClick={handleSave} className="w-full bg-custom-green hover:bg-custom-green-hover text-custom-black font-bold py-2 px-4 rounded-lg focus:ring focus:ring-green-200" type="submit">Save</button>

      </form>
      </div>
    </div>
  );
} 

export default EditProfile;
