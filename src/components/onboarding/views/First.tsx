
function First() {

  
  return (
    <div>
      <h1>Choose your fitness level:</h1>
      <form action="/action_page.php">
        <input type="radio" id="html" name="fav_language" value="beginner" />
        <label htmlFor="html">Beginner</label><br />
        <input type="radio" id="css" name="fav_language" value="intermediate" />
        <label htmlFor="css">Intermediate</label><br />
        <input type="radio" id="javascript" name="fav_language" value="expert" />
        <label htmlFor="javascript">expert</label><br />
      </form>
    </div>
  );
}

export default First;