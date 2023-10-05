import { SetStateAction, useState } from "react";
import NormalForm from "../components/shared/NormalForm";

const optionsLevel = [
  { value: 1, label: "Beginner" },
  { value: 2, label: "Intermediate" },
  { value: 3, label: "Expert" },
];
const optionsIntensity = [
  { value: 1, label: "1 time a week" },
  { value: 3, label: "3 times a week" },
];

const optionsTimeFrame = [
  { value: 3, label: "3 weeks" },
  { value: 6, label: "6 weeks" },
];

function Onboarding() {
  const [intensity, setIntensity] = useState(optionsIntensity[0].value);
  const [level, setLevel] = useState(optionsLevel[0].value);
  const [TimeFrame, setTimeFrame] = useState(optionsTimeFrame[0].value)

  const handleIntensityChange = (value: any) => {
    setIntensity(value);
  };

  const handleLevelChange = (value: any) => {
    setLevel(value);
  };
  const handleTimeFrameChange = (value: any) => {
    setTimeFrame(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Intensity:", intensity);
    console.log("Level:", level);
    console.log("Time Frame:", TimeFrame);

  };
 

  return (
    <div>
      <h1>welcome dear user....</h1>
    <form onSubmit={handleSubmit}>
      <NormalForm label="Intensity" options={optionsIntensity} onChange={handleIntensityChange} />
      <NormalForm label="Level" options={optionsLevel} onChange={handleLevelChange} />
      <NormalForm label="timeframe" options={optionsTimeFrame} onChange={handleTimeFrameChange} />
      <button type="submit">Submit</button>
    </form>
    <h1> you will get a program tailored to your needs</h1>
    <h1>you have selected {intensity} times a week in {TimeFrame} weeks so you need to train on avrage {TimeFrame/intensity} time a week</h1>
    </div>
   
  );
}

export default Onboarding;