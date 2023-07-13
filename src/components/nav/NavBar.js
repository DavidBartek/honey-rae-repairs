import "./NavBar.css"
import { CustomerNav } from "./CustomerNav"
import { EmployeeNav } from "./EmployeeNav"

export const NavBar = () => {
	
    const localHoneyUser = localStorage.getItem("honey_user")
    const honeyUserObject = JSON.parse(localHoneyUser)
    
    if (honeyUserObject.staff) {
        // return employee version of the nav bar
        return <EmployeeNav />
    } else {
        // return customer version of the nav bar
        return <CustomerNav />
    }
}

