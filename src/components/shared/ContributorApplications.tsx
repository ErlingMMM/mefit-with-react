import { useEffect, useState } from "react";
import { getUserApplicationsAsync } from "../../Redux/GenericSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../Redux/Store";
import { AnyAction } from "@reduxjs/toolkit";
import keycloak from "../../Keycloak";
import { get } from "http";

function ContributorApplications() {
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
  
      const contributorID = "a7209254-84a0-420d-bf67-bf5287738cd2"
      const roleName =  "contributor";
      const keycloakBaseUrl = "https://lemur-10.cloud-iam.com/auth/"
      const realm = "deploy-mefit"  
      
  
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

    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const UserApplications = useSelector((state: any) => state.data.userApplication);
    useEffect(() => {
        dispatch(getUserApplicationsAsync()).then((response) => {
           if(response.type === "getUserApplicationsAsync/fulfilled"){
            setIsLoading(false)
           }
        });
      }, [dispatch]); 

    
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
            <div>
              <br />
              <span className="font-bold text-white">id:</span> {userId} <br />
              <span className="font-bold text-white">fitnessPreference:</span> {obj.fitnessPreference} <br />
              <span className="font-bold text-white">application text:</span> {obj.applicationText}
              <button
                onClick={() => handleApplicationClick(userId)}
                className="bg-[#a3e635] text-white font-bold py-2 px-4 rounded focus:shadow-outline"
              >
                accept application
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


