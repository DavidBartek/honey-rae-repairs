// parent module enabling TicketList and TicketSearch can share state.

import { useState } from "react"
import { TicketList } from "./TicketList"
import { TicketSearch } from "./TicketSearch"

export const TicketContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")

    return <>
        <TicketSearch setterFunction={setSearchTerms} example1={100} example2={"foobar"}/>
        <TicketList searchTermState={searchTerms}/>
    </> // setterFunction and searchTermState are PROPS. 
    // Think of them as key:value pairs assoc. w/ a component containing state, 
    // now accessible places outside of that component.
    // see TicketSearch in the devTools
}