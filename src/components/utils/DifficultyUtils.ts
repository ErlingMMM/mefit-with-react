class DifficultyUtils {
    static difficultyToLabel(difficulty: number | undefined): string {
      switch (difficulty) {
        case 0:
          return "Beginner";
        case 1:
          return "Intermediate";
        case 2:
          return "Expert";
        default:
          return "Unknown"; // Handle unexpected values if necessary
      }
    }

}
  


  export default DifficultyUtils;
  