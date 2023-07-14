import { useEffect, useState } from "react"
import "./Employees.css"
import { Employee } from "./Employee"

export const EmployeeList = () => {
    const [employees, setEmployees] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/users?isStaff=true`)
                .then(res => res.json())
                .then((employeeArray) => {
                    setEmployees(employeeArray)
            })
        },
        []
    )

    return <article className="employees">
        {
            employees.map(employee => <Employee key={`employee--${employee.id}`}
                id={employee.id}
                fullName={employee.fullName}
                email={employee.email} />)
        }
    </article>
}

// ^^ deconstructs employee into 3 props, passes down into the Employee module