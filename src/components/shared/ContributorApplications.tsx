import { useEffect, useState } from "react";
import { getUserApplicationsAsync } from "../../Redux/GenericSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../Redux/Store";
import { AnyAction } from "@reduxjs/toolkit";
import keycloak from "../../Keycloak";


function ContributorApplications() {
    
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const UserApplications = useSelector((state: any) => state.data.userApplication);
    useEffect(() => {
        dispatch(getUserApplicationsAsync()).then((response) => {
           if(response.type === "getUserApplicationsAsync/fulfilled"){
            setIsLoading(false)
           }
        });
      }, [dispatch]); 

    const [userRoles, setUserRoles] = useState<{ [userId: string]: number }>({});

    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [ApplicationApproved,setApplicationApproved] = useState(false);

    const GetUserRole = async (userId: string) => {
        const keycloakBaseUrl = keycloak.authServerUrl;
        const realm = keycloak.realm;
        const url = `${keycloakBaseUrl}/admin/realms/${realm}/users/${userId}/role-mappings/realm`;

        try {
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${keycloak.token}`,
                "Content-Type": "application/json",
              }
            });
        
            if (response.ok) {
                const data = await response.json();
                if(data.length >1){
                    return  2 
                }
                else{
                    return 1
                }
             
            }
        } 
        catch (error) {
            console.error(error);
        }
    }
    
  
    const updateRole = (userId:string) => {
  
      const contributorID = "f8f42429-d0dd-436d-a7b8-8fcdf5ec7ee3"
      const roleName =  "contributor";
      const keycloakBaseUrl = keycloak.authServerUrl;
      const realm = keycloak.realm; 
      
  
      const url2 = `${keycloakBaseUrl}/admin/realms/${realm}/users/${userId}/role-mappings/realm`;

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
          "Content-Type": "application/json",
        },
        body: 
        JSON.stringify([{ id: contributorID, name: roleName }]), 
      };
  
      fetch(url2, requestOptions)
        .then((response) => {
            console.log(response.status)
          if (response.ok) {
            setSuccessMessage("Brukerens rolle ble oppdatert til contributor.");
          } else {
            setErrorMessage("Feil ved oppdatering av brukerens rolle.");
          }
        })
        .catch((error) => {
          setErrorMessage("Feil ved oppdatering av brukerens rolle.");
          console.error(error);
        });
    };

    
      interface DivVisibility {
        [key: string]: boolean;
      }

    const [divVisibility, setDivVisibility] =  useState<DivVisibility>({});

  const handleApplicationClick = (userId: string) => {
    updateRole(userId);
    setDivVisibility((prevState) => ({
      ...prevState,
      [userId]: false, 
    }));
  };

useEffect(() => {
  const fetchUserRoles = async () => {
    const roles: { [userId: string]: number } = {};
    await Promise.all(UserApplications.map(async (obj: any) => {
      const userId = obj.id;
      const role = await GetUserRole(userId);
      roles[userId] = role || 0;
    }));
    setUserRoles(roles);
  };

  if (UserApplications.length > 0) {
    fetchUserRoles();
  }
}, [UserApplications]);

  
    return (
        <div>
        <h1 className="font-bold text-2xl text-black">Contributor Applications</h1>
{!isLoading && (
  <ul>
    {UserApplications.map((obj: any) => {
      const userId = obj.id;
      const userRole = userRoles[userId];
      const isVisible = userRole === 1 && divVisibility[userId] !== false;

      return (
        isVisible &&  (
          <li key={userId}>
           <div className="text-black mb-2 p-2  flex justify-between items-center">
            <div>

    <p className="font-bold">ID: {userId}</p>
    <p className="font-bold">First Name: {obj.firstName}</p>
    <p className="font-bold">Last Name: {obj.lastName}</p>
    <p className="font-bold">Fitness Preference: {obj.fitnessPreference}</p>
    <p className="font-bold">Application Text:  <br />{obj.applicationText}</p>
    </div>
    <button
        onClick={() => handleApplicationClick(userId)}
        className="bg-[#a3e635] hover:bg-red-600 text-custom-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Accept Application
    </button>
</div>

          </li>
        )
      );
    })}
  </ul>
)}

      </div>

    );
}

export default ContributorApplications;


