import styles from "./Dashboard.module.css" //locally scoped

function Progress() {
  let week: number = 1; //This number needs to be retrieved from the database later
  let goalWorkouts: number = 3; //This number needs to be calculated as timeframe divided by number of goalworkouts with values from the database later
  let completedWorkouts: number = 1; //The number of workouts completed this week
  let progress: number = Math.floor(completedWorkouts/goalWorkouts*100); 
  return (
    <div className={styles.progressParentContainer}>
      <div className={styles.progressContainer}>

        <h1><b>Week {week}</b></h1>

        <div className={styles.goalWrapper}>
          <h1 className={styles.goalText}><b>Goal:</b></h1>
          <h1>{goalWorkouts} workouts</h1>
        </div>

      </div>

      <h1 className={styles.progress_h1}><b>Progress: </b> {progress}%</h1>

      <div className={styles.progressRectangles}>
        {Array.from({ length: goalWorkouts }).map((_, idx) => ( //maps from [undefined, undefined, ..., undefined] of length n = goalWorkouts to [1,2,..,n]
          <div 
            key={idx} // if idx is less than completedWorkouts its green (completed) otherwise grey (pending)
            className={`${styles.rectangle} ${idx < completedWorkouts ? styles.completedRectangle : styles.pendingRectangle}`}
          ></div>
        ))}
      </div>

    </div>
  );
}

export default Progress;
