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


  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

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

              <div className="px-4 pb-6 rounded-b-lg justify-center flex items-center">
                {isSubscribed ? null : (
                  <button
                    onClick={() => navigateDashboard()}
                    className="block pb-2 sm:pt-3 px-4 rounded-md text-custom-black font-bold sm:m-2 cursor-pointer hover:bg-gray-50 border-2 border-[#C0392B] hover:border-[#e3897f] items-center"
                  >
                    Go back to dashboard
                  </button>
                )}
              </div>
            </div>
            <div className=" ">
              <button
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
                onClick={() => subscribe(id)}
                className="w-full  font-bold sm:py-2 py-6 rounded-lg relative block leading-tight ease-in"
              >
                  <span className="absolute -inset-6 rounded-lg bg-[#6664AC]"></span>

  <span
    className={`absolute -left-48 w-[47rem] h-[8rem] transition-all duration-700 origin-top-right rounded-r-full -translate-x-full translate-y-24 bg-custom-green ease ${
      hovered ? '-rotate-90' : '-rotate-180'
    }`}
  ></span>
  <span className="relative text-lg bottom-2">Subscribe</span>

              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SubscribeModal;



{/*<div className="relative inline-block text-lg group p-5  w-96 h-7 "></div>*/}







