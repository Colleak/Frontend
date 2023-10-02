import { Component, ReactNode } from "react";
import Employee from "../user/Employees";
import { Text, View } from "react-native";
import getApp from "../data/ApiAccess";

interface State {
    employeeData: Employee[] | null;
}

export default class EmployeeComponent extends Component<{}, State> {
    public state: State = {
        employeeData: null,
    };

    componentDidMount() {
        getApp().then(employeeData => {
            if (Array.isArray(employeeData)) {
                this.setState({ employeeData });
            } else {
                console.error("Failed to fetch employee data:", employeeData);
            }
        });
    }

    public render(): ReactNode {
        const { employeeData } = this.state;

        if (!employeeData) {
            return <Text>Loading...</Text>;  
        }

        return (
            <View>
                {employeeData.map((employee: Employee) => (
                    <Text key={employee.id}>Employee Name: {employee.employeeName}</Text>
                ))}
            </View>
        );
    }
}
