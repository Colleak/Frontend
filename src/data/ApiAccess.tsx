import Employee from "../user/Employees";
import AppData from "../../AppData.json";

async function getApp(): Promise<Employee[] | number> {
    let url: URL = new URL("Employees", AppData.serverAddress);
    let response: Response = await fetch(url);
    if (!response.ok) {
        return response.status;
    }
    let employees: Employee[] = (await response.json()) as Employee[];
    return employees;
}
export default getApp;