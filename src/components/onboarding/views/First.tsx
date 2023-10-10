import { ChangeEvent, FormEvent, useState } from "react";
import { SetuserFName } from "../../../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { AnyAction } from "@reduxjs/toolkit";

function First() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [fornavn, setFornavn] = useState<string>('');
  const navnetKonge = useSelector((state: any) => state.data.userData.name);
  
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFornavn(event.target.value);
    dispatch(SetuserFName(event.target.value));
  };
  
  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Her kan du gjøre noe med fornavnet, for eksempel sende det til en API eller utføre en annen handling.
  };
  

  return (
    <div>
      <h1>Skjema for Brukerens Fornavn</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Fornavn:
          <input
            type="text"
            value={fornavn}
            onChange={ handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>

      <h1>Choose your fitness level:</h1>
      <form action="/action_page.php">
        <input type="radio" id="html" name="fav_language" value="HTML" />
        <label htmlFor="html">Beginner</label><br />
        <input type="radio" id="css" name="fav_language" value="CSS" />
        <label htmlFor="css">Intermediate</label><br />
        <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
        <label htmlFor="javascript">Expert</label><br />
      </form>
    </div>
  );
};

export default First;

