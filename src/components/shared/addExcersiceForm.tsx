import React from 'react';

function addExcersiceForm() {
    return (
        
      <form className='bg-white p-8 rounded shadow-md'>
      <label className='block mb-2 text-gray-800' htmlFor="bio">name:</label>
      <input   className='w-full p-2 mb-4 border rounded' type="text" id="bio" name="bio" />

      <label className='block mb-2 text-gray-800' htmlFor="age">description:</label>
      <input className='w-full p-2 mb-4 border rounded' type="text" id="age" name="age" />

      <label className='block mb-2 text-gray-800' htmlFor="height">"muscleGroup:</label>
      <input  className='w-full p-2 mb-4 border rounded' type="text" id="height" name="height" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">image:</label>
      <input className='w-full p-2 mb-4 border rounded' type="text" id="weight" name="weight" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">video:</label>
      <input className='w-full p-2 mb-4 border rounded' type="text" id="weight" name="weight" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">sets:</label>
      <input className='w-full p-2 mb-4 border rounded' type="text" id="weight" name="weight" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">reps:</label>
      <input className='w-full p-2 mb-4 border rounded' type="text" id="weight" name="weight" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">time:</label>
      <input className='w-full p-2 mb-4 border rounded' type="text" id="weight" name="weight" />

      <label className='block mb-2 text-gray-800' htmlFor="weight">difficulty:</label>
      <input className='w-full p-2 mb-4 border rounded' type="text" id="weight" name="weight" />
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' type="submit">Save</button>

    </form>
    );
}


export default addExcersiceForm;