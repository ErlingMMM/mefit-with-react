import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <div className="bg-blue-500 text-red-300 p-4">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}



export default App;
