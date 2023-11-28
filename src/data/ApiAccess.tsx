import Employee from "../models/user/Employees";
import AppData from "../../AppData.json";

async function getApp(): Promise<Employee[] | number> {
    // Construct the URL
    const fullUrl = `${AppData.serverAddress}Employees`; // Concatenating the base URL with the endpoint

    let response: Response = await fetch(fullUrl);
    if (!response.ok) {
        return response.status;
    }

    const responseData = await response.json(); // Read the response body once
    console.log(responseData); // Log the data if needed
    return responseData as Employee[];
}

export default getApp;