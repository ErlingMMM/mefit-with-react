import { ChangeEvent, FormEvent, SetStateAction, useState } from "react";
import { SetUserFitnessLVL, SetuserFName } from "../../../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { AnyAction } from "@reduxjs/toolkit";

function First() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [fornavn, setFornavn] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState('option1');
  const fintessLevelBruker = useSelector((state: any) => state.data.userData.fitnessPreference);
  


  const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
    dispatch(SetUserFitnessLVL(event.target.value));

  }
  return (
    
    <div className="flex flex-col items-center h-screen bg-white">
    <h1 className="text-3xl font-bold mb-6">Fitness Level</h1>
    <form className="p-48 rounded justify-center">
      <div className="mb-4 p-6 round hover:scale-125">
        <input type="radio" id="Beginner" name="fitnessLevel" value="Beginner" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
        <label htmlFor="Beginner" className="text-lg">Beginner</label>
      </div>
      <div className="mb-4 p-6 rounded hover:scale-125">
        <input type="radio" id="Intermediate" name="fitnessLevel" value="Intermediate" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
        <label htmlFor="Intermediate" className="text-lg">Intermediate</label>
      </div>
      <div className="mb-4 p-6 rounded hover:scale-125">
        <input type="radio" id="Expert" name="fitnessLevel" value="Expert" onChange={handleRadioChange} className="mr-2 h-8 w-8" />
        <label htmlFor="Expert" className="text-lg">Expert</label>
      </div>
    </form>
  </div>

  );
};

export default First;

