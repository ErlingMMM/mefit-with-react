import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Exercise from './pages/Exercise';
import Login from './pages/Login';
import MainView from './components/mainView/mainView';
import Onboarding from './pages/Onboarding';
import ProfilePage from './pages/ProfilePage';
import { store } from './Redux/Store';
import ExcerciseData from './pages/ExcerciseData';
function App() {
  return (
  
    <Provider store={store}>
      <Router>
        <div className="bg-blue-500 text-red-300 p-4">

          <Routes>
            <Route path="/" element={<MainView />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ob" element={<Onboarding/>} />
            <Route path="/proffa" element={<ProfilePage/>} />
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/ed" element={<ExcerciseData />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
export default App;







