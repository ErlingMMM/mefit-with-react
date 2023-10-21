import React, { useEffect } from 'react';
import keycloak from "../../Keycloak";
import { RootState } from '../../Redux/Store';
import { useNavigate } from 'react-router-dom';
import { setActiveComponent } from '../../Redux/NavigationSlice';
import { useSelector, useDispatch } from 'react-redux';


interface SideMenuProps {
  isOpen: boolean;
  page: string;
  switchToComponent: any;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, switchToComponent, page }) => {
  const activeComponent = useSelector((state: RootState) => state.navigation.activeComponent);
  const user = useSelector((state: any) => state.data.userData.fitnessPreference);
  const isAdmin = keycloak.hasRealmRole('admin');
  const isContributor = keycloak.hasRealmRole('contributor');
  const dispatch = useDispatch();


  const navigate = useNavigate();
  const onclickAdminContributor = () => {
    navigate('/rolepage')
  }

  const onImageClick = () => {
    if (page === "rolePage") {
      navigate('/');
      dispatch(setActiveComponent('profile'));
    } else {
      switchToComponent('profile');
    }
  }

  useEffect(() => {
    // Apply or remove overflow:hidden to prevent scrolling when the menu is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed left-0 top-0 h-full w-2/3 bg-black transform opacity-90 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-150`}
    >
      <h1
        className={`font-bold text-custom-green text-2xl italic text-right absolute top-6 right-5`}
      >
        MeFit
      </h1>
      <div className={` text-center text-xl h-full flex flex-col`}>

        <div className='text-custom-green text-center mt-40'>
          <button onClick={() => onImageClick()} style={{ cursor: 'pointer', background: 'none', border: 'none', outline: 'none' }}>
            <img
              src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=1961&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="ProfilePage"
              style={{ borderRadius: '50%', width: '150px', height: '150px', border: '4px solid' }}
            />
          </button>
        </div>


        {page === "rolePage" ? (
          <div className="text-white flex flex-col justify-center items-center mb-20">
            <div className='text-white'>{keycloak.tokenParsed ? keycloak.tokenParsed.name : 'Unknown'}</div>
            <button onClick={() => switchToComponent('addExercise')} className="my-2">Add Exercise</button>
            <button onClick={() => switchToComponent('addWorkout')} className="my-2">Add Workout</button>
            <button onClick={() => switchToComponent('addProgram')} className="my-2">Add Program</button>
            {isAdmin && (
              <>
                <button onClick={() => switchToComponent('manageApplications')} className="my-2">Manage Applications</button>
                <button onClick={() => switchToComponent('manageUsers')} className="my-2">Manage Users</button>
              </>
            )}

            {(isAdmin || isContributor) && (
              <button onClick={onclickAdminContributor} className="my-2">Contributor</button>
            )}
          </div>
        ) : (
          <>
            <div className='text-white'>{keycloak.tokenParsed ? keycloak.tokenParsed.name : 'Unknown'}</div>

            <div className='text-custom-green text-sm'>{user}</div>
            <button onClick={() => switchToComponent('dashboard')} className={`${activeComponent === "dashboard" ? "text-custom-green" : "text-white"} mt-auto`}>Dashboard</button>
            <button onClick={() => switchToComponent('explorer')} className={`${activeComponent === "explorer" ? "text-custom-green" : "text-white"} mt-auto`}>Explorer</button>
            {(isAdmin || isContributor) && (
              <button onClick={onclickAdminContributor} className='text-white text-lg mt-auto' style={{ marginBottom: '100px' }}>Contributor</button>
            )}
          </>
        )}

        {keycloak.authenticated && (
          <button onClick={() => keycloak.logout()} className='text-white text-lg mt-auto' style={{ marginBottom: '100px' }}
          >Logout</button>
        )}
      </div>
    </div>
  );
};

export default SideMenu;