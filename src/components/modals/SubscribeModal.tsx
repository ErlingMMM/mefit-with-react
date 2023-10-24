import { XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector  } from 'react-redux';
import { setActiveComponent } from '../../Redux/NavigationSlice';
import keycloak from '../../Keycloak';
import WeekPicker from '../shared/Calendar';
import { RootState } from '../../Redux/Store';

function SubscribeModal({ isOpen, closeModal, id }: { isOpen: boolean, id: number, closeModal: () => void }) {
  const StartingDate = useSelector((state: RootState) => state.data.startingDateUser.startingDate);
  
    function subscribe(id: number | undefined) {
        console.log(id);
        console.log(StartingDate)
        //dispatch(setActiveComponent('dashboard'));
        
        if (id === undefined) {
          console.error('ID is undefined. Cannot make the API request.');
          return;
        }
      
        const requestOptions = {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${keycloak.token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            planId: id,
            startDate: StartingDate
            }
        )};
      
        fetch('https://mefit-backend.azurewebsites.net/api/Users/AddPlanToUser', requestOptions)
          .then(response => {
            if (response.ok) {
              console.log(response.status);
              return response.text(); // Read the response as text
            }
            if (!response.ok) {
              console.log(response.status);
              console.log(response.text())
              return Promise.reject('Network response was not ok.');
            }
          })
          .then(responseText => {
            if (responseText) {
              try {
                // Parse the response as JSON
                const user = JSON.parse(responseText);
                console.log(user);
              } catch (error) {
                console.error('Error parsing JSON:', error);
              }
            } else {
              console.error('Response text is undefined or empty.');
            }
          })
          .catch(error => {
            // Handle errors here
            console.error('There has been a problem with your fetch operation:', error);
          });
      }
      
  

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
                  <div className='pt-4'>
                  <WeekPicker/>
                  </div>
      
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
