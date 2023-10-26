import React from 'react'

function LoadingAnimation() {
  return (
    <section>
    <div className="flex flex-wrap justify-center py-20  mt-5">
      <div
        className="loading px-5 py-0  bg-black text-custom-green relative block focus:outline-none border-2 border-solid rounded-lg text-sm text-center font-semibold uppercase tracking-widest" 
        data-text="Loading"
      >
       
        <span className="align-middle"></span>
        <span className="align-middle"></span>
        <span className="align-middle"></span>
        <span className="align-middle"></span>
        <span className="align-middle"></span>
        <span className="align-middle"></span>
        <span className="align-middle"></span>
        
      
      </div>
    </div>
  </section>
  )
}

export default LoadingAnimation