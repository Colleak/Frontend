import Employee from "../models/user/Employees";
import AppData from "../../AppData.json";

async function getApp(): Promise<Employee[] | number> {
    let url: URL = new URL("Employees", AppData.serverAddress);
    let response: Response = await fetch(url);
    if (!response.ok) {
        return response.status;
    }
    return (await response.json()) as Employee[];
}
export default getApp;