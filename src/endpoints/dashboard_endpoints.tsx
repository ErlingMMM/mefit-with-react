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

//function to to update the completion status of a workout associated with a user given the id of the workout
export async function completeWorkout(wId : number){
    const accessToken = keycloak.token; 
    const apiURL = `https://mefit-backend.azurewebsites.net/api/Users/user/workout/isCompleted/${wId}`;
    try{
        const response = await fetch(apiURL, { 
            method: 'PUT',
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'application/json'
            }
        });

        // Check if the response indicates success (204 No Content)
        if (response.status !== 204) {
            const errorMessage = await response.text(); // Read the response body as text
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }
    }
    catch (error){
        console.error("Error changing completion status of workout:", error);
        throw error; // Re-throw the error if you want it to be caught by any caller
    }
}

//function to get the startDate for the users program
export async function getStartDate(){
    const accessToken = keycloak.token; 
    const apiURL = 'https://mefit-backend.azurewebsites.net/api/Users/user/startdate'
    try{
        const response = await fetch(apiURL,{ 
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'text/plain'
            }
        });
        // Check if the response is successful
        if (!response.ok) {
            const errorMessage = await response.text(); // Read the response body as text
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }

        //If the response is a 200 Ok:
        const results = await response.text(); // Notice the "await" here as well, since response.json() is asynchronous

        return results
    }
    catch (error){
        console.error("Error fetching start date:", error);
        return ""; // Return an empty array or some default value if the fetch fails
    }
}

//Function to get Plan from user
export async function getPlan(){
    const accessToken = keycloak.token; 
    const apiURL = 'https://mefit-backend.azurewebsites.net/api/Users/user/plan'
    try{
        const response = await fetch(apiURL,{ 
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'text/plain'
            }
        });
        // Check if the response is successful
        if (!response.ok) {
            const errorMessage = await response.text(); // Read the response body as text
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }

        //If the response is a 200 Ok:
        const results = await response.json(); // Notice the "await" here as well, since response.json() is asynchronous

        return results
    }
    catch (error){
        console.error("Error fetching plan:", error);
        return null; // Return an empty array or some default value if the fetch fails
    }
}