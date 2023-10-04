import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Exercise from './pages/Exercise';
import MainView from './components/mainView/mainView';

function App() {
  return (
    <Router>
      <div className="bg-blue-500 text-red-300 p-4">
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/login" element={<Login />} />
          <Route path="/exercise" element={<Exercise />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
