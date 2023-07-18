// Honey Rae ch 16
// "Helper" component for TicketList
// accepts 3 props from TicketList
// manages data between 3 resources: tickets, employees, tickets-to-employees.

import { Link } from "react-router-dom"

export const Ticket = ({ employees, ticketObject, currentUser, getAllTickets }) => {
    
    // find assigned employee for the current ticket
    let assignedEmployee = null
    
    if (ticketObject.employeeTickets.length > 0) {
        const ticketEmployeeRel = ticketObject.employeeTickets[0]
        assignedEmployee = employees.find(employee => employee.id === ticketEmployeeRel.employeeId)
    }

    // find employee profile object for current user
    const userEmployee = employees.find(employee => employee.userId === currentUser.id)

    const buttonOrNoButton = () => {
        if (currentUser.staff) {
           return <button
                    onClick={() => {
                        fetch(`http://localhost:8088/employeeTickets`, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                employeeId: userEmployee.id,
                                serviceTicketId: ticketObject.id
                            })
                        })
                            .then(res => res.json())
                            .then(() => {
                                // GET the state from the API again
                                getAllTickets()
                            })
                    }}
                    >Claim</button>
        } else {
            return ""
        }
    }

    return (
        <section className="ticket">
            <header>
                {
                    currentUser.staff
                        ? `Ticket ${ticketObject.id}`
                        : <Link to={`/tickets/${ticketObject.id}/edit`}>Ticket {ticketObject.id}</Link>
                }
            </header>
            <section>{ticketObject.description}</section>
            <section>Emergency: {ticketObject.emergency ? "🧨" : "No"}</section>
            <footer>
                {
                    ticketObject.employeeTickets.length
                        ? `Currently being worked on by ${assignedEmployee !== null ? assignedEmployee?.user?.fullName : ""}`
                        : buttonOrNoButton()
                }
            </footer>
        </section>
    )
}