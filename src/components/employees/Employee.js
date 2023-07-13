export const Employee = ({id, fullName, email}) => {
    return <section className="employee">
        <div>Name: {fullName}</div>
        <div>Email: {email}</div>
    </section>
}

// Child of EmployeeList
// props: takes the deconstructed object from EmployeeList.js, which iterates over the employees list,
// manipulates each of the passed-in props to spec