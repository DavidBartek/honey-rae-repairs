// form for a customer to edit his/her already-submitted ticket (via PUT)
// links from customer's view of ticket list; ticket id has been passed into the url
// Form will look very similar to TicketForm component, except:
// GET data based on route parameter
// request to save data is PUT (not POST)
// CHECKED attribute of checkbox must be bound to ticket.emergency property

import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const TicketEdit = () => {

    const [ticket, update] = useState({
        description: "",
        emergency: false
    })

    const {ticketId} = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/serviceTickets?id=${ticketId}`)
            .then(res => res.json())
            .then((data) => {
                const ticketObj = data[0]
                update(ticketObj)
            })
    }, [ticketId])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        return fetch(`http://localhost:8088/serviceTickets/${ticketId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(ticket)
        })
            .then(res => res.json())
            .then(() => {
                navigate("/tickets")
            })

    }

    return (
        <form className="ticketForm">
            <h2 className="ticketForm__title">New Service Ticket</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="Brief description of problem"
                        value={ticket.description}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.description = evt.target.value
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Emergency:</label>
                    <input type="checkbox"
                        checked={ticket.emergency}
                        onChange={
                            (evt) => {
                                const copy = {...ticket}
                                copy.emergency = evt.target.checked
                                update(copy)
                            }
                        } />
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary">
                Save Ticket Edits
            </button>
        </form>
    )
}