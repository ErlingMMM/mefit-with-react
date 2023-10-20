import keycloak from "../Keycloak";

export async function addExerciseToWorkout(workoutId: any, exerciseIds: number[]) {
    const accessToken = keycloak.token;
    const apiURL = 'https://mefit-backend.azurewebsites.net/api/plan/addworkouttoplan';

    console.log("Access Token:", accessToken);  // Log the token

    try {
        console.log("About to fetch data");  // Log before fetch

        const response = await fetch(apiURL, {
            method: 'POST',  // Make it a POST request
            headers: {
                'Authorization': `Bearer ${accessToken}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                workoutId : workoutId,
                exerciseIds: exerciseIds, // Change to an array
            })
        });
       
        console.log("Fetched data:", response.body);  // Log the response

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }

        const results = await response.json();
        console.log("JSON Results:", results);  // Log the results

        return results;
    }
    catch (error) {
        console.error("Error fetching workouts:", error);
        return [];  // Return an empty array if the fetch fails
    }
}
