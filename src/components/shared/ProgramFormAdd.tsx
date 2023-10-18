import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/Store';
import { setProgramName, setProgramDesc, setProgramImg, setProgramDur, setProgramOrd, AddProgramAsync, setPlanId} from '../../Redux/GenericSlice';
import { setActiveComponent } from '../../Redux/NavigationSlice';
import AddWorkoutsCompoent from '../RoleBasedComponents/AddWorkoutsComponent';
function AddProgramForm() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const ProgramName = useSelector((state: any) => state.data.programData.name);
  const ProgramDesc = useSelector((state: any) => state.data.programData.description);
  const ProgramImg = useSelector((state: any) => state.data.programData.image);
  const ProgramDur = useSelector((state: any) => state.data.programData.programDuration);
  const ProgramOrd = useSelector((state: any) => state.data.programData.orderOfWorkouts);
  const navigate = useNavigate();

    const handleName = (event: { target: { value: SetStateAction<string>; }; }) => {
    
      dispatch(setProgramName(event.target.value));
      console.log(ProgramName)
    }
    const handleDesc = (event: { target: { value: SetStateAction<string>; }; }) => {
      dispatch(setProgramDesc(event.target.value));
  
    }
    const handleImg = (event: { target: { value: SetStateAction<string>; }; }) => {
     
      dispatch(setProgramImg(event.target.value));
  
    }
    const handleDur = (event: { target: { value: SetStateAction<string>; }; }) => {

      dispatch(setProgramDur(event.target.value));
      console.log(ProgramDur)
    }
    const handleOrd = (event: { target: { value: SetStateAction<string>; }; }) => {

      dispatch(setProgramOrd(event.target.value));
      console.log(ProgramOrd)
    }
    const postProgram = (e: React.FormEvent) => {
      e.preventDefault();
      dispatch(AddProgramAsync({
        name: ProgramName,
        description: ProgramDesc,
        image: ProgramImg,
        programDuration: ProgramDur,
        orderOfWorkouts: ProgramOrd,
        programDifficulty: 1,
      }))
      .then(response => {
        console.log("Promise resolved", response);
        if (response.payload) {
          dispatch(setPlanId(response.payload));  // Set the plan ID in the state
          setIsFormSubmitted(true);  // Ensure this line is being reached
        }
      })
      .catch(error => {
        console.log("Promise rejected", error);
      });
    };

   

    return (
        isFormSubmitted
        ? <AddWorkoutsCompoent />
        : (
      <form className='bg-white p-8 rounded shadow-md'>
      <label className='block mb-2 text-gray-800'>name:</label>
      <input onChange={handleName}  className='w-full p-2 mb-4 border rounded' type="text" id="name" name="name" />

      <label className='block mb-2 text-gray-800'>description:</label>
      <input onChange={handleDesc} className='w-full p-2 mb-4 border rounded' type="text" id="description" name="description" />

      <label className='block mb-2 text-gray-800'>"image:</label>
      <input onChange={handleImg}  className='w-full p-2 mb-4 border rounded' type="text" id="image" name="image" />

      <label className='block mb-2 text-gray-800'>programDuration:</label>
      <input onChange={handleDur} className='w-full p-2 mb-4 border rounded' type="text" id="programDuration" name="programDuration" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">orderOfWorkouts:</label>
      <input onChange={handleOrd} className='w-full p-2 mb-4 border rounded' type="text" id="orderOfWorkouts" name="orderOfWorkouts" />

      <button onClick={postProgram}className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Save</button>

    </form>)
    );
}


export default AddProgramForm;