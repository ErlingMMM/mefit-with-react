import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthGuardAdminContributor from '../AuthGuard/AuthGuardAdminContributor';
import keycloak from '../Keycloak';
import AddExcersiceForm from '../components/shared/ExcersiceFormAdd';
import AddWorkoutForm from '../components/shared/WorkoutFormAdd';
import AddProgramForm from '../components/shared/ProgramFormAdd';
import ContributorApplications from '../components/shared/ContributorApplications';
import DeleteUserView from '../components/shared/DeleteUsersView';
import RolePageNavbar from '../components/rolepage/RolePageNavbar';

function RolePage() {
  const isAdmin = keycloak.hasRealmRole('admin');
  const [currentForm, setCurrentForm] = useState('addExercise');
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const switchToComponent = (component: string) => {
    setCurrentForm(component);
    setMenuOpen(false);
  };

  const onClickBack = () => {
    navigate('/');
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'addExercise':
        return <AddExcersiceForm />;
      case 'addWorkout':
        return <AddWorkoutForm />;
      case 'addProgram':
        return <AddProgramForm />;
      case 'manageApplications':
        return <ContributorApplications />;
      case 'manageUsers':
        return <DeleteUserView />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white h-screen flex flex-col">
      <RolePageNavbar isAdmin={isAdmin} toggleMenu={() => setMenuOpen(!menuOpen)} switchToComponent={switchToComponent} />
      
      <div className="bg-white flex-grow flex flex-col justify-center items-center">
        
        {renderForm()}
      </div>
      <button className='bg-custom-green text-gray-800 font-bold py-2 px-4 rounded absolute top-4 right-4 sm:top-8 sm:right-8'
                    onClick={onClickBack}>Back</button>
    </div>
  );
}

export default function () {
  return <AuthGuardAdminContributor component={RolePage} path="/some-path" />;
}
