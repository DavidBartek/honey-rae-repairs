import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const EmployeeDetails = () => {
    // this will extract and employeeId for use in EmployeeViews router

    const {employeeId} = useParams() // useParams() grabs the employeeId out of the URL
    const [employee, updateEmployee] = useState({})

    // use json-server query parameter strings to fetch exactly the info needed
    useEffect(
        () => {
            fetch(`http://localhost:8088/employees?_expand=user&_embed=employeeTickets&userId=${employeeId}`)
                .then(res => res.json())
                .then((data) => {
                    const singleEmployee = data[0]
                    updateEmployee(singleEmployee)
                })
        },
        [employeeId]
    )

    return <section className="employee">
        <header className="employee__header">{employee?.user?.fullName}</header>
        <div>Email: {employee?.user?.email}</div>
        <div>Specialty: {employee?.specialty}</div>
        <div>Hourly rate: ${employee?.rate}</div>
        <footer className="employee__footer">Currently working on {employee?.employeeTickets?.length} {employee?.employeeTickets?.length == 1 ? "ticket only..." : employee?.employeeTickets?.length >= 1 ? "tickets, what a good employee" : "nothing. Fired."}</footer>
    </section>
}

// ?. is optional chaining operator.
// 2 reasons this is used above:
// 1: line 24 (<header>): "employee" not populated with the necessary properties until the page's re-render,
// due to "user" and its properties being part of the fetch url _expand query string parameter
// 2: line 28 (<footer>): Objects are not valid as children in React (employeeTickets array: underlying is an object)
//
// Josh recommends not even using optional chaining, but doing an if / else each providing a return.
// if !employee, return null
// else, the above return.
// implement this in the customer views.