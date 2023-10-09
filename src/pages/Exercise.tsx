import { useState } from 'react';
import ExerciseModal from '../components/modals/ExerciseModal';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoginAsync } from "../Redux/GenericSlice";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../Redux/Store";

function Exercise() {
const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
const user = useSelector((state:any) => state.data.data);
const loading = useSelector((state:any) => state.data.loading);
const error = useSelector((state:any) => state.data.error);
const [isModalOpen, setIsModalOpen] = useState(false);


useEffect(() => {
  dispatch(getLoginAsync());
}, []); 

console.log(user)

  const openModal = () => {
    setIsModalOpen(true);
  };


  const exerciseData = [
    {
      title: "Exercise 1",
      description: "Description of Exercise 1",
    },
    {
      title: "Exercise 2",
      description: "Description of Exercise 2",
    },
  ];
  


  return (
    <div>
    <h1>Exercise</h1>
    <button onClick={openModal}>Open Modal</button>
    <ExerciseModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} />

    {exerciseData.map((exercise, index) => (
      <div key={index}>
        <h2>{exercise.title}</h2>
        <p>{exercise.description}</p>
        <button>Button for Exercise {index + 1}</button>
      </div>
    ))}
  </div>
);
}

export default Exercise;

















