// contains a component function that accepts a single customer object as a prop
// this is essentially a helper function of CustomerList, outsourced to another module
// displays customer name, address, and phone #
// cf. Employee.js

import { Link } from "react-router-dom"

export const Customer = ({id, name, address, phone}) => {
    return <section className="customer">
        <div>
            Name: <Link to={`/customers/${id}`}>
                {name}
            </Link>
        </div>
        <div>
            Address: {address}
        </div>
        <div>
            Phone: {phone}
        </div>
    </section>
}