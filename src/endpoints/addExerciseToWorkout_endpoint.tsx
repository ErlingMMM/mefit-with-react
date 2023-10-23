import keycloak from "../Keycloak";

export async function addExerciseToWorkout(workoutId: any, exerciseIds: number[]) {
    const accessToken = keycloak.token;
    const apiURL = 'https://mefit-backend.azurewebsites.net/api/workouts/addexercisetoworkout';

    console.log("Access Token:", accessToken);  // Log the token
    console.log("------------------" + workoutId + " " + exerciseIds);
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
       

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }


    }
    catch (error) {
        console.error("Error fetching exercises:", error);
        return [];  // Return an empty array if the fetch fails
    }
}
