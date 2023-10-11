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

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFornavn(event.target.value);
    dispatch(SetuserFName(event.target.value));
  };
  
  /*
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Her kan du gjøre noe med fornavnet, for eksempel sende det til en API eller utføre en annen handling.
  };
  */

  const handleRadioChange = (event: { target: { value: SetStateAction<string>; }; }) => {
    setSelectedOption(event.target.value);
    dispatch(SetUserFitnessLVL(event.target.value));
    console.log(event.target.value)

  }
  return (
    <div>

      <h1>Choose your fitness level:</h1>
      <form action="/action_page.php">
        <input type="radio" id="Beginner" name="PacmaniaRadioButton" value="Beginner" onChange={handleRadioChange} />
        <label htmlFor="html">Beginner</label><br />
        <input type="radio" id="Intermediate" name="pacmaniaRadioButton" value="Intermediate"  onChange={handleRadioChange} />
        <label htmlFor="css">Intermediate</label><br />
        <input type="radio" id="Expert" name="pacmaniaRadioButton" value="Expert"  onChange={handleRadioChange}/>
        <label htmlFor="javascript">Expert</label><br />
      </ form>
    </div>
  );
};

export default First;

