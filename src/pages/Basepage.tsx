import Navbar from '../components/shared/Navbar';
import ContentView from '../components/views/basePage/ContentView';
import { useSelector } from 'react-redux';
import { RootState } from '../Redux/Store'; // Assuming you have a 'Store.ts' file


function Basepage() {
  const activeComponent = useSelector((state: RootState) => state.navigation.activeComponent);

 


  return (
    <>
    <div className='overflow-x-hidden	'>
    <Navbar />
        <ContentView activeComponent={activeComponent} />
    </div>
   
      </>
  );
}

export default Basepage;