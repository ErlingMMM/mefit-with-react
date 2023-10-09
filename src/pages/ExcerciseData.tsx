
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "@reduxjs/toolkit";
import { RootState } from "../Redux/Store";
import { getExcersiceInfo, getWorkoutInfo } from "../Redux/GenericSlice";

function ExerciseData() {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const exercises = useSelector((state: any) => state.data.exerciseData);
  const workouts = useSelector((state: any) =>  state.data.workoutData );
  const exerciseLoading = useSelector((state: any) => state.loading);
  const workoutLoading = useSelector((state: any) => state.loading);

  useEffect(() => {
    dispatch(getExcersiceInfo());
    dispatch(getWorkoutInfo());
  }, []);
  return (
    <div>
      <p>Hei min gode venn, alt vel nå skal jeg prøve å printe all dataen her</p>
      <div>
        <br />
        <h1>Øvelser:</h1>
        {exerciseLoading && <h1>Loading exercises...</h1>}
        <ul>
          {Array.isArray(exercises) ? (
            exercises.map((exercise: any) => (
              <li key={exercise.id}>
                {exercise.name} - {exercise.description} - {exercise.muscleGroup}
              </li>
            ))
          ) : (
            <li>No exercises available</li>
          )}
        </ul>
      </div>
      <br></br>
      <div>
        <h1>Workouts:</h1>
        {workoutLoading && <h1>Loading workouts...</h1>}
        <ul>
          {Array.isArray(workouts) ? (
            workouts.map((workout: any) => (
              <li key={workout.id}>
                {workout.name} - {workout.description} - anbefalt nivå: {workout.recommendedFitness}
              </li>
            ))
          ) : (
            <li>No workouts available</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ExerciseData;
