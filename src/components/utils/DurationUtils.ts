
class DurationUtils {
    static formatDuration(minutes: number): string {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
  
      if (hours === 0) {
        return `${remainingMinutes} min`;
      } else if (remainingMinutes === 0) {
        return `${hours}h`;
      } else {
        return `${hours}h ${remainingMinutes} min`;
      }
    }
  }
  
  export default DurationUtils;
  