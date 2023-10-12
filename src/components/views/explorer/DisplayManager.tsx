import Exercises from "./Exercises";
import Workouts from "./Workouts";
function DisplayManager({ activeComponent }: { activeComponent: string }) {
    switch (activeComponent) {
        case 'exercises':
            return <Exercises />;
        case 'workouts':
            return <Workouts />;
        default:
            return null;
    }
}

export default DisplayManager