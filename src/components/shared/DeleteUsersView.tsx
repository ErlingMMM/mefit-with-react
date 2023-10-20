import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import { useEffect, useState } from "react";
import { DeleteUserAsync, getAllUsersAsync } from "../../Redux/GenericSlice";
import keycloak from "../../Keycloak";

function DeleteUserView () {

    const [isLoading, setIsLoading] = useState(true);
    const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
    const Users = useSelector((state: any) => state.data.userData);
    useEffect(() => {
        dispatch(getAllUsersAsync()).then((response) => {
           if(response.type === "getAllUsersAsync/fulfilled"){
            setIsLoading(false)
           }
        });
      }, [dispatch]); 

      const DeleteUser = async (userId: string) => {
        const keycloakBaseUrl = keycloak.authServerUrl;
        const realm = keycloak.realm;
        const url = `${keycloakBaseUrl}admin/realms/${realm}/users/${userId}/`;
        
        try {
            const response = await fetch(url, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${keycloak.token}`,
                "Content-Type": "application/json",
              }
            });
            console.log(response)
            if (response.ok) {
                console.log("du er ferdig!")
             
            }
        } 
        catch (error) {
            console.error(error);
        }
    }

    const DClick = (userId: string) => {
      if(userId === keycloak.subject){
        alert("You can not delete the admin user")
        return;
      }
    };

      const DeleteUserClick = (userId: string) => {
        if(userId === keycloak.subject){
          alert("You can not delete yourself, you are the admin user")
          return;
        }
        else{
          DeleteUser(userId);
         dispatch(DeleteUserAsync({ GUID: userId }));
        }
      };
        return (
            <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Delete Users</h1>
            {!isLoading && Users.map((user: any) => (
              <div key={user.id} className="mb-2 p-2 border-b border-gray-300 flex justify-between items-center">
                <p className="text-lg">{user.id}</p>
                <button    onClick={() =>  DeleteUserClick(user.id)} className="bg-[#a3e635] hover:bg-red-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Delete
                </button>
              </div>
            ))}
          </div>
          
        );
    }    
    
    export default DeleteUserView;

