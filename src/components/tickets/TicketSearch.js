export const TicketSearch = ({ setterFunction }) => {
    return (
        <div>
            <input 
                onChange={
                    (e) => {
                        setterFunction(e.target.value)
                    }
                }
            type="text" placeholder="Enter search terms" />
        </div>
    )
}