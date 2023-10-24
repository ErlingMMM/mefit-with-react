import { XIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { setActiveComponent } from '../../Redux/NavigationSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import keycloak from '../../Keycloak';




function SubscribeModal({ isOpen, closeModal, id }: { isOpen: boolean, id: number, closeModal: () => void }) {

  const subscribe = (id: number) => {
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${keycloak.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        planId: id,
        startDate: '2023-10-23'
      })
    };
  
    fetch('https://mefit-backend.azurewebsites.net/api/Users/AddPlanToUser', requestOptions)
      .then(response => {
        if (response.ok) {
          console.log(response.status)
          return response.json();
        }
        if(!response.ok){
          console.log(response.text())
          console.log(response.status)
        }
        throw new Error('Network response was not ok.');
      })
      .then(user => {
        // Handle the successful response here
        console.log(user);
      })
      .catch(error => {
        // Handle errors here
        console.error('There has been a problem with your fetch operation:', error);
      });
  };
  

    const dispatch = useDispatch();
    const modalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
    };

  

    function navigateDashboard() {
        dispatch(setActiveComponent('dashboard'));
    }

    return (
        <>
          {isOpen && (
            <div
              className="fixed inset-0 z-10 w-screen h-screen overflow-y-auto flex items-center justify-center"
              aria-labelledby="modal-title"
              role="dialog"
              aria-modal="true"
              onClick={closeModal}
            >
              <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
              <div className="relative rounded-2xl overflow-hidden bg-white text-center shadow-xl transition-all max-h-screen">
                <div className="bg-white pb-5 sm:p-6 sm:pb-4 text-black" onClick={modalContentClick}>
                  <XIcon
                    className="h-6 w-6 text-black hover:bg-gray-200 hover:bg-opacity-50 rounded-full cursor-pointer absolute left-3 top-3"
                    onClick={closeModal}
                  />
      
                  <div className=" px-4 pb-6 rounded-b-lg">
                    <button
                      onClick={() => subscribe(id)}
                      className="block pb-2 pt-3 px-4 rounded-md m-2 cursor-pointer hover:bg-gray-100"
                    >
                      Subscribe
                    </button>
                  </div>
                </div>
                <div className="bg-custom-green py-6 px-4 hover:opacity-90"> 
                  <button
                    onClick={() => navigateDashboard()}
                    className="text-black w-full px-4 font-bold text-lg sm:py-2 py-6 rounded-lg hover:text-gray-600 ">
                    Go back to dashboard
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
      
      
}

export default SubscribeModal;
