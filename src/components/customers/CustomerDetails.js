// when the customer's name is clicked in the list view (CustomerList.js),
// displays the full name, email, phone #, and address of the customer
// cf. EmployeeDetails.js

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export const CustomerDetails = () => {
    
    const {customerId} = useParams()
    const [customer, setCustomer] = useState({})

    useEffect(
        () => {
            fetch(`http://localhost:8088/customers?_expand=user&userId=${customerId}`)
                .then(res => res.json())
                .then((customerData) => {
                    const singleCustomer = customerData[0]
                    setCustomer(singleCustomer)
                })
        },
        [customerId]
    )

    if (!customer || !customer.user) {
        return null
    } else {
        return <section className="customer">
        <header className="customer__header">{customer.user.fullName}</header>
        <div className="customer__email">Email: {customer.user.email}</div>
        <div className="customer__phone">Phone: {customer.phoneNumber}</div>
        <div className="customer__address">Address to send junk to: {customer.address}</div>
        <footer className="customer__isStaff">Is an enemy: possibly</footer>
        </section>
    }
    
}