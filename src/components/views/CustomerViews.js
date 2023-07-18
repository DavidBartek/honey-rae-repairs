import { Outlet, Route, Routes } from "react-router-dom"
import { TicketForm } from "../serviceTickets/TicketForm"
import { TicketList } from "../tickets/TicketList"
import { Profile } from "../profile/Profile"

export const CustomerViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>Honey Rae Repair Shop</h1>
                    <div>Your one-stop-shop to get all your electronics fixed</div>

                    <Outlet />
                </>
            }>

                <Route path="profile" element={<Profile /> } />
                <Route path="tickets" element={<TicketList />} />
				<Route path="ticket/create" element={ <TicketForm /> } />
            </Route>
        </Routes>
    )
}