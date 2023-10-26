import { useNavigate } from "react-router-dom";
import { setActiveComponent } from "../Redux/NavigationSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../Redux/Store";
import { SetStateAction, useState } from "react";
import { AddApplicationUserAsync, setApplicationTextUser } from "../Redux/GenericSlice";
import { useTheme } from "../styles/ThemeContext";
import { useEffect } from "react";
function ApplicationPage (){
    const { isDarkMode } = useTheme();

    useEffect(() => {
      document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);
    
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const UserApplicationText = useSelector((state: any) =>  state.data.userData.applicationText);
    const navigate = useNavigate();
    const onClickBack = () => { 
        navigate('/');
    }

    const handleApplicationChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        dispatch(setApplicationTextUser(event.target.value));
    }

    const handleApplicationSubmit = (event: { preventDefault: () => void; }) => {
        console.log(UserApplicationText);
        dispatch(AddApplicationUserAsync({ ApplicationText: UserApplicationText }));
        dispatch(setActiveComponent('profile'));   
        navigate('/');
    }

    return (
        <div className='bg-white h-screen flex flex-col justify-center items-center'>
              <h1
        className={`font-bold text-black text-2xl italic text-right absolute top-6 right-5`}
      >
        MeFit
      </h1>
      <br />
            <h1 className='text-3xl font-bold mb-4 text-black text-center'>Application to become a contributor</h1>
    
            <button onClick={onClickBack} className=' text-gray-800 font-bold py-2 px-4 rounded absolute top-4 left-4'>Back</button>
    
            <form className='bg-white p-8 rounded shadow-md'>
                <label className='block mb-2 text-gray-800 font-bold' htmlFor="bio">Application text:</label>
                <textarea onChange={handleApplicationChange} className='w-full h-40 p-2 mb-4 border rounded align-top' id="bio" name="bio"></textarea>
    
                <button  onClick={handleApplicationSubmit} className="w-full bg-custom-green text-custom-black font-bold py-2 px-4 rounded-lg focus:ring focus:ring-green-200" type="submit">Send application</button>
            </form>
        </div>
    )
    
}

export default ApplicationPage;