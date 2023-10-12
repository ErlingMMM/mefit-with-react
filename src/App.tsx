import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import BasePage from './pages/Basepage';
import Onboarding from './pages/Onboarding';
import { store } from './Redux/Store';
import './App.css';
function App() {
  return (
  
    <Provider store={store}>
      <Router>
        <Routes>
            <Route path="/" element={<BasePage />} />
            <Route path="/onboarding" element={<Onboarding/>} />
          </Routes>
       </Router>
    </Provider>
  );
}
export default App;




