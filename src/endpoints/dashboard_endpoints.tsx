import keycloak from "../Keycloak";

//function to get dashboard workouts from the currently logged in user using the guid from Keycloak
export async function getWorkouts(){
    const accessToken = keycloak.token; 
    const apiURL = 'https://mefit-backend.azurewebsites.net/api/Users/user/workouts'
    try{
        const response = await fetch(apiURL,{ 
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'application/json'
            }
        });
        // Check if the response is successful
        if (!response.ok) {
            const errorMessage = await response.text(); // Read the response body as text
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }

        //If the response is a 200 Ok:
        const results = await response.json(); // Notice the "await" here as well, since response.json() is asynchronous

        return results;
    }
    catch (error){
        console.error("Error fetching workouts:", error);
        return []; // Return an empty array or some default value if the fetch fails
    }
}