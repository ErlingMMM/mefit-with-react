import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import MainView from './components/mainView/mainView';

function App() {
  return (
    <Router>
      <div className="bg-blue-500 text-red-300 p-4">
        <Routes>
          <Route path="/" element={<MainView />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
