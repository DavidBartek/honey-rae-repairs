// contains a component function that fetches all customers
// iterates the array in the JSX to display the name of each customer
// by passing each object into the Customer component as a prop
// cf. EmployeeList.js

import { useEffect, useState } from "react"
import "./Customers.css"
import { Customer } from "./Customer"

export const CustomerList = () => {
    const [customers, setCustomers] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user`)
                .then(res => res.json())
                .then((customerArray) => {
                    setCustomers(customerArray)
            })
        },
        []
    )

    return <article className="customers">
        {
            customers.map(customer => <Customer key={`customer--${customer.userId}`}
                id={customer.userId}
                name={customer.user.fullName}
                phone={customer.phoneNumber}
                address={customer.address} />
                )
        }
    </article>
}

// deconstruct customer into props: customer name (in users), address (in customers), and phone # (in customers)