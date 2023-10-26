import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React, { SetStateAction, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../Redux/Store';
import { setProgramName, setProgramDesc, setProgramImg, setProgramDur, setProgramOrd, AddProgramAsync, setPlanId} from '../../Redux/GenericSlice';
import { setActiveComponent } from '../../Redux/NavigationSlice';
import AddWorkoutsCompoent from '../RoleBasedComponents/AddWorkoutsComponent';
function AddProgramForm() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [programName, setProgramName] = useState("");
  const [programDesc, setProgramDesc] = useState("");
  const [programImg, setProgramImg] = useState("");
  const [programDur, setProgramDur] = useState("");
  const [programDif, setProgramDif] = useState("1");
  const [hovered, setHovered] = useState(false);


  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramName(event.target.value);
  }

  const handleDesc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramDesc(event.target.value);
  }

  const handleImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramImg(event.target.value);
  }

  const handleDur = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramDur(event.target.value);
  }

  const handleDif = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProgramDif(event.target.value);
    console.log(programDif)
  }
    const postProgram = (e: React.FormEvent) => {
      e.preventDefault();
    
      dispatch(AddProgramAsync({
        name: programName,
        description: programDesc,
        image: programImg,
        duration: parseInt(programDur),
        difficulty: parseInt(programDif),
      }))
      .then(response => {
        console.log("Promise resolved", response);
        if (response.payload) {
          dispatch(setPlanId(response.payload));  // Set the plan ID in the state
          setIsFormSubmitted(true);  // Ensure this line is being reached
          // To store a variable
          localStorage.setItem('duration', programDur);
        }
      })
      .catch(error => {
        console.log("Promise rejected", error);
      });
    };

    const handleMouseEnter = () => {
      setHovered(true);
    };
  
    const handleMouseLeave = () => {
      setHovered(false);
    };

    return (
      isFormSubmitted
      ? <AddWorkoutsCompoent />
      : (
        <div>
          <h1 className="text-2xl font-bold mb-8 text-center">Create Program</h1>
        <form className='bg-white p-8 rounded-lg space-y-4'>
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="name">Name:</label>
            <input onChange={handleName} className='w-full p-2 border rounded-lg' type="text" id="name" name="name" />
          </div>
  
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="description">Description:</label>
            <input onChange={handleDesc} className='w-full p-2 border rounded-lg' type="text" id="description" name="description" />
          </div>
  
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="image">Image:</label>
            <input onChange={handleImg} className='w-full p-2 border rounded-lg' type="text" id="image" name="image" />
          </div>
  
          <div className="space-y-2">
            <label className='text-lg text-gray-800' htmlFor="programDuration">Program Duration:</label>
            <div className="flex flex-col">
              <label className="inline-flex items-center">
                <input onChange={handleDur} type="radio" value="15" name="programDuration" checked={programDur === '15'} />
                <span className="ml-2">15 days</span>
              </label>
              <label className="inline-flex items-center">
                <input onChange={handleDur} type="radio" value="30" name="programDuration" checked={programDur === '30'} />
                <span className="ml-2">30 days</span>
              </label>
              <label className="inline-flex items-center">
                <input onChange={handleDur} type="radio" value="60" name="programDuration" checked={programDur === '60'} />
                <span className="ml-2">60 days</span>
              </label>
            </div>
          </div>

          <div className="space-y-2">
      <label className='text-lg text-gray-800' htmlFor="programDifficulty">Program Difficulty:</label>
      <div className="flex flex-col">
        <label className="inline-flex items-center">
          <input onChange={handleDif} type="radio" value="0" name="programDifficulty" checked={programDif === '1'} />
          <span className="ml-2">Beginner</span>
        </label>
        <label className="inline-flex items-center">
          <input onChange={handleDif} type="radio" value="1" name="programDifficulty" checked={programDif === '2'} />
          <span className="ml-2">Intermediate</span>
        </label>
        <label className="inline-flex items-center">
          <input onChange={handleDif} type="radio" value="2" name="programDifficulty" checked={programDif === '3'} />
          <span className="ml-2">Expert</span>
        </label>
      </div>
    </div>
  
        
      
          <button
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={postProgram}
      className="w-full overflow-hidden font-bold sm:py-2 py-6 mt-2 rounded-lg relative block leading-tight ease-in"
      type="submit">
      <div className="absolute -inset-6 rounded-lg transition-color group italic bg-custom-green text-lg"></div>
      <span className={`absolute -inset-6 rounded-lg text-${hovered ? 'white' : 'black'} `}></span>

      <span
        className={`absolute -left-48 sm:-left-12 w-[47rem] sm:h-[8rem] h-36 text-${hovered ? 'white' : 'black'} bg-black transition-all duration-700 origin-top-right rounded-r-full -translate-x-full translate-y-24 ease ${hovered ? '-rotate-180' : ' -rotate-90'}`}
      ></span>

      <span className={`relative text-lg bottom-2 ease-in italic text-${hovered ? 'white' : 'black'} top-0.5`}>Add Program</span>
    </button>
        </form>
        </div>
      )
  );
  
}


export default AddProgramForm;