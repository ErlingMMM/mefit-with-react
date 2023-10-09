import React from 'react'

function Third() {
  return (
    
    <div>
      <h1>Choose your timeframe:</h1>
      <form action="/action_page.php">
        <input type="radio" id="html" name="fav_language" value="HTML" />
        <label htmlFor="html">1 month</label><br />
        <input type="radio" id="css" name="fav_language" value="CSS" />
        <label htmlFor="css">2 months</label><br />
        <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
        <label htmlFor="javascript">6 months</label><br />
      </form>
    </div>
  );
}


export default Third