import { Link } from "react-router-dom"

export const Employee = ({id, fullName, email}) => {
    return <section className="employee">
        <div>
            Name: <Link to={`/employees/${id}`}>
            {fullName}
            </Link>
        </div>
        <div>Email: {email}</div>
    </section>
}

// Child of EmployeeList
// basically a helper function but in a different module
// props: takes the deconstructed object from EmployeeList.js, which iterates over the employees list,
// manipulates each of the passed-in props to spec

// Purpose:
// Adds a link within each name, which takes the id prop of that particular employee
// specifies the path as defined in EmployeeViews.js: employees/employeeId
// fleshed out in the EmployeeDetails module