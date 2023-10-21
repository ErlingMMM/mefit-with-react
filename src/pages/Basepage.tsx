import Navbar from '../components/views/basePage/Navbar';
import ContentView from '../components/views/basePage/ContentView';
import authGuard from '../AuthGuard/authGuard';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store';


function Basepage() {
  const activeComponent = useSelector((state: RootState) => state.navigation.activeComponent);

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