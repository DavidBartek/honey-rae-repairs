import { useEffect, useState } from "react"
import "./Tickets.css"
import { useNavigate } from "react-router-dom"

export const TicketList = () => {
    
    // *** useState() hooks (also useNavigate()) ***
    
    const [tickets, setTickets] = useState([])
    const [filteredTickets, setFiltered] = useState([])
    const [emergency, setEmergency] = useState(false)
    const [openOnly, updateOpenOnly] = useState(false)
    const navigate = useNavigate()

    // accesses the "honeyUserObject" which has been passed in to local storage as "honey_user."
    // cf. Register.js, Login.js for the creation of this. 

    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)

    // *** useEffect() hooks ***

    // fetches serviceTickets data (array) from API; invoking setTickets to set tickets state to hold this data.
    // dependencies array is empty; therefore componenent's initial state is being observed.
    useEffect(
        () => {
            fetch (`http://localhost:8088/serviceTickets`)
                .then(res => res.json())
                .then((ticketArray) => {
                    setTickets(ticketArray)
                })
        },
        []
    )
    
    // assigns different state to tickets depending on if user if staff or not. Staff: all tix. Non-staff: filtered.
    // dependencies array is watching for when tickets state is modified.
    useEffect(
        () => {
            console.log(tickets)
            if (honeyUserObject.staff) {
                // for employees
                setFiltered(tickets)
            } 
            else {
                // for customers
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
        },
        [tickets]
    )

    // if emergency state is set to true, filter tickets array by emergency property = true.
    // dependencies array is watching for when emergency state is modified.
    useEffect(
        () => {
            if (emergency) {
                const emergencyTickets = tickets.filter(ticket => ticket.emergency === true)
                setFiltered(emergencyTickets)
            } else {
                setFiltered(tickets)
            }
        },
        [emergency]
    )
    
    // if openOnly is set to true, filter tickets array by tickets from that user AND dateCompleted is empty string
    // (i.e., show that user's open tickets)
    // if openOnly is set to false, filter tickets array by displaying all tickets of that user
    // dependencies array is watching for when openOnly state is modified.
    useEffect(
        () => {
            if (openOnly) {
                const openTicketArray = tickets.filter(ticket => {
                    return ticket.userId === honeyUserObject.id && ticket.dateCompleted === ""
                })
                setFiltered(openTicketArray)
            } else {
                const myTickets = tickets.filter(ticket => ticket.userId === honeyUserObject.id)
                setFiltered(myTickets)
            }
            
        },
        [openOnly]
    )    


    // *** HTML OF TICKET LIST PAGE ***
    // staff will display buttons to toggle "Emergency Only" and "Show All"
    // non-staff will display buttons to navigate to "Create Ticket," toggle his "Open Tickets" and "All My Tickets"

    return <>
        {
            honeyUserObject.staff
                ? <>
                    <button onClick={ () => {setEmergency(true)}} >Emergency Only</button>
                    <button onClick={ () => {setEmergency(false)}} >Show All</button>
                </>
                : <>
                    <button onClick={() => navigate("/ticket/create")}>Create Ticket</button>
                    <button onClick={() => updateOpenOnly(true)}>Open Tickets</button>
                    <button onClick={() => updateOpenOnly(false)}>All My Tickets</button>
                </>
        }

        
        <h2>List of Tickets</h2>

        <article className="tickets">
            {
                filteredTickets.map(
                    (ticket) => {
                        return <section className="ticket">
                            <header>{ticket.description}</header>
                            <footer>Emergency: {ticket.emergency ? "🧨" : "No"}</footer>
                        </section>
                    }
                )
            }
        </article>
        </>
}

