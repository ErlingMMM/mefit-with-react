import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import BasePage from './pages/Basepage';
import Onboarding from './pages/Onboarding';
import { store } from './Redux/Store';
import './App.css';
import EditProfile from './pages/EditProfile';
import Rolepage from './pages/RolePage';
import ApplicationPage from './pages/ApplicationPage';
import { ThemeProvider, useTheme } from './styles/ThemeContext';
import { useEffect } from 'react';
function App() {
 
  return (
  <ThemeProvider>
    <Provider store={store}>
      <Router>
        <Routes>
            <Route path="/" element={<BasePage />} />
            <Route path="/onboarding" element={<Onboarding/>} />
            <Route path="/editprofile" element={<EditProfile/>} />
            <Route path="/rolepage" element={<Rolepage/>}/>
            <Route path="/app" element={<ApplicationPage/>}/>
          </Routes>
       </Router>
    </Provider>
    </ThemeProvider>
  );
}
export default App;




