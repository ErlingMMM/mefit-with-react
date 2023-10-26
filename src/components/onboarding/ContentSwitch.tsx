import ChooseDifficulty from "./views/ChooseDifficulty";
import ChooseWorkoutsWeek from "./views/ChooseWorkoutsWeek";
import ChooseTimeframe from "./views/ChooseTimeframe";

function ContentSwitch({ activeComponent }: { activeComponent: number }) {
    switch (activeComponent) {
      case 1:
        return <ChooseDifficulty />;
      case 2:
        return <ChooseWorkoutsWeek />;
      case 3:
        return <ChooseTimeframe />;
    
      default:
        return null;
    }
  }

  export default ContentSwitch