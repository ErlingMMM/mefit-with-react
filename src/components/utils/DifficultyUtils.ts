class DifficultyUtils {
    static difficultyToLabel(difficulty: number | undefined): string {
      switch (difficulty) {
        case 1:
          return "Beginner";
        case 2:
          return "Intermediate";
        case 3:
          return "Expert";
        default:
          return "Unknown"; 
      }
    }

}
  
  export default DifficultyUtils;
  