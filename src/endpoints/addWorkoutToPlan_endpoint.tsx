import keycloak from "../Keycloak";

export async function addWorkoutToPlan(planId: any, workoutIds: number[], days: number[]) {
    const accessToken = keycloak.token;
    const apiURL = 'https://mefit-backend.azurewebsites.net/api/plan/addworkouttoplan';

    console.log("Access Token:", accessToken);
    console.log(planId, workoutIds, days);

    try {
        console.log("About to fetch data");

        const response = await fetch(apiURL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: planId,
                workoutIds: workoutIds,
                days: days
            })
        });

        console.log(`Response Status: ${response.status}, ${response.statusText}`);
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }

    } catch (error) {
        console.error("Error adding workouts", error);
    }
}
