import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../../Redux/Store';
import { RegisterUserAsync, SetuserFName, SetuserLName } from '../../../Redux/GenericSlice';
import { AnyAction } from '@reduxjs/toolkit';

function Second() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const [etternavn, setFornavn] = useState<string>('');
  const etternavnBruker = useSelector((state: any) => state.data.userData.firstName);
  const fornnavnBruker = useSelector((state: any) => state.data.userData.lastName);
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setFornavn(event.target.value);
    dispatch(SetuserLName(event.target.value));

  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    // Her kan du gjøre noe med fornavnet, for eksempel sende det til en API eller utføre en annen handling.

  };
  
console.log("brukerens fornavn er lagret som",fornnavnBruker)
console.log("brukerens etternavn er lagret som",etternavnBruker)



const handleRegistrerClick = () => {
  dispatch(RegisterUserAsync({ firstname: fornnavnBruker, lastname:etternavnBruker}));
};

  return (
    <div>
      <h1>Skjema for Brukerens Fornavn</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Fornavn:
          <input
            type="text"
            value={etternavn}
            onChange={ handleInputChange}
          />
        </label>
        <button onClick={handleRegistrerClick} type="submit">registrer</button>
      </form>
    </div>
  );
};


export default Second