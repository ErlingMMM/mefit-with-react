import React from 'react'

function Second() {
  return (
    
      <div>
        <h1>Choose your intensity level:</h1>
        <form action="/action_page.php">
          <input type="radio" id="html" name="fav_language" value="HTML" />
          <label htmlFor="html">1 time a week</label><br />
          <input type="radio" id="css" name="fav_language" value="CSS" />
          <label htmlFor="css">3 times a week</label><br />
          <input type="radio" id="javascript" name="fav_language" value="JavaScript" />
          <label htmlFor="javascript">5 times a week</label><br />
        </form>
      </div>
    );
}

export default Second