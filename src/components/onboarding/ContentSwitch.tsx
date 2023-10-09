import First from "./views/First";
import Second from "./views/Second";
import Third from "./views/Third";

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