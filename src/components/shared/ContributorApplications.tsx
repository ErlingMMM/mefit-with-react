import { useEffect } from "react";
import { getUserApplicationsAsync } from "../../Redux/GenericSlice";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../Redux/Store";
import { AnyAction } from "@reduxjs/toolkit";
import keycloak from "../../Keycloak";

function ContributorApplications() {

    const contributorID = "a7209254-84a0-420d-bf67-bf5287738cd2"
    const roleName =  "contributor";
    const KeycloakURL = "https://lemur-10.cloud-iam.com/auth/"
    const RealmName = "deploy-mefit"  
    
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const UserApplications = useSelector((state: any) => state.data.userApplication);
    useEffect(() => {
        dispatch(getUserApplicationsAsync());
      }, [dispatch]); 
      console.log(keycloak)

      /*
       <ul>
          {UserApplications.map((obj: any) => (
            <li key={obj.id}>
                <br />
                <span className="font-bold text-white">id:</span> {obj.id} <br />
              <span className="font-bold text-white">fitnessPreference:</span> {obj.fitnessPreference} <br />
              <span className="font-bold text-white">application text:</span> {obj.applicationText}
              <br />
            </li>
          ))}
        </ul>
      */
    return (
        <div>
        <h1 className="font-bold text-2xl text-black">Contributor Applications</h1>
       
      </div>

    );
}

export default ContributorApplications;


