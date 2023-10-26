import { useState } from 'react';
import { XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveComponent } from '../../Redux/NavigationSlice';
import keycloak from '../../Keycloak';
import WeekPicker from '../shared/Calendar';
import { RootState } from '../../Redux/Store';

function SubscribeModal({ isOpen, closeModal, id }: { isOpen: boolean, id: number, closeModal: () => void }) {
  const StartingDate = useSelector((state: RootState) => state.data.startingDateUser.startingDate);
  const dispatch = useDispatch();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const modalContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };


  function navigateDashboard() {
    dispatch(setActiveComponent('dashboard'));
  }

  function subscribe(id: number | undefined) {
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
        startDate: StartingDate,
      })
    };

    fetch('https://mefit-backend.azurewebsites.net/api/Users/AddPlanToUser', requestOptions)
      .then(response => {
        if (response.ok) {
          console.log("Subscribed to plan");

          setIsSubscribed(true);
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

          <div className={`relative rounded-2xl overflow-hidden bg-white text-center shadow-xl transition-all max-h-screen`}>
            <div className="bg-white pb-5 sm:p-6 sm:pb-4 text-black" onClick={modalContentClick}>
              <XIcon
                className="h-6 w-6 text-black hover:bg-gray-200 hover:bg-opacity-50 rounded-full cursor-pointer absolute left-3 top-3"
                onClick={closeModal}
              />
              <div className="sm:pt-4 pt-7">
                {isSubscribed ? null : <h1 className='font-bold '>Select starting week</h1>}
                {isSubscribed ? null : <WeekPicker />}
              </div>

              <div className="sm:pt-4 pt-7 text-center">
                {isSubscribed ? (
                  <h1>Congratulations! You have subscribed to the program</h1>
                ) : null}
              </div>

              <div className="px-4 pb-6 sm:pb-10 rounded-b-lg justify-center flex items-center">
                {isSubscribed ? null : (
                  <button onClick={() => subscribe(id)}
                    className="w-full sm:w-40 font-bold sm:py-2 py-6 rounded-lg relative block leading-tight ease-in overflow-hidden"
                  >
                    <div className="relative text-sm hover:text-white  group transition-color duration-700 italic text-black">
                      <span className="absolute -inset-6 rounded-lg bg-custom-green"></span>
                      <span className="absolute right-0 w-0 sm:w-[47rem] h-36 bg-black transition-all duration-300 origin-right transform translate-x-full -translate-y-2 ease-in group-hover:translate-x-0 -translate-y-4">
                      </span>
                      <span className="relative">Subscribe</span>
                    </div>
                  </button>
                )}
              </div>

            </div>
            <div>
              <button
                onClick={() => navigateDashboard()}
                className="w-full font-bold sm:py-2 py-6 rounded-lg relative block leading-tight ease-in overflow-hidden"
              >
                <div className="relative text-lg text-white group transition-color duration-700 italic hover:text-black">
                  <span className="absolute -inset-6 rounded-lg bg-black"></span>
                  <span className="absolute right-0 w-0 sm:w-[47rem] h-36 bg-custom-green transition-all duration-300 origin-right transform translate-x-full -translate-y-2 ease-in group-hover:translate-x-0 -translate-y-4">
                  </span>
                  <span className="relative">Go back to dashboard</span>
                </div>
              </button>


            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SubscribeModal;










