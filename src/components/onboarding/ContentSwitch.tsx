import First from "./views/ChooseDifficulty";
import Second from "./views/ChooseWorkoutsWeek";
import Third from "./views/ChooseTimeframe";

function ContentSwitch({ activeComponent }: { activeComponent: number }) {
    switch (activeComponent) {
      case 1:
        return <First />;
      case 2:
        return <Second />;
      case 3:
        return <Third />;
    
      default:
        return null;
    }
  }

  export default ContentSwitch