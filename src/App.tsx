import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './pages/Login';
import Index from './pages/Basepage';
import Onboarding from './pages/Onboarding';
import { store } from './Redux/Store';
import './App.css';
function App() {
  return (
  
    <Provider store={store}>
      <Router>
        <div className="bg-blue-500 text-red-300 p-4">

          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/ob" element={<Onboarding/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
export default App;

//Workflow test





