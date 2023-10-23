import keycloak from "../Keycloak";

export async function getPlan(id: any){
    const accessToken = keycloak.token; 
    const apiURL = 'https://mefit-backend.azurewebsites.net/api/plan/' + id;

    console.log("Access Token:", accessToken);  // Log the token
    
    try {
        console.log("About to fetch data");  // Log before fetch

        const response = await fetch(apiURL, { 
            headers: {
              'Authorization': `Bearer ${accessToken}`, 
              'Content-Type': 'application/json'
            }
        });

        console.log("Fetched data:", response);  // Log the response

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
        }

        const results = await response.json();
        console.log(results)
        return results;
    }
    catch (error) {
        console.log("Failed to get plan:", error);
    }
}
