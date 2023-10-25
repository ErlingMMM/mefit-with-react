import Navbar from '../components/navigation/Navbar';
import ContentView from '../components/views/basePage/ContentView';
import authGuard from '../AuthGuard/authGuard';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';
import { useEffect } from 'react';
import { useTheme } from '../styles/ThemeContext';

function Basepage() {
  const activeComponent = useSelector((state: RootState) => state.navigation.activeComponent);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
  }, [isDarkMode]);

  
  return (
    <>
   {/*<div className='overflow-x-hidden bg-custom-main'>*/} 
   <div className='overflow-x-hidden'>
    <Navbar/>
        <ContentView activeComponent={activeComponent} />
    </div>
    </>
  );
}

export default authGuard(Basepage)