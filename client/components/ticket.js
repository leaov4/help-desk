import React from 'react'
import {Spinner} from 'react-bootstrap'

const Ticket = props => {
    const {ticketStatus, name, email, ticketText, resolveIssue} = props
    return (
        <div className={`box ${ticketStatus}`}>
            {ticketStatus === 'pending' && <div>Ticket Submitted! </div>}
            {ticketStatus === 'in-progress' && 
                <><div>Ticket Received! </div>
                <div>assinged to: {name}</div></>
            }
            <div>by: Beta Tester</div>
            <div className="status">status: {ticketStatus}</div>
            {ticketStatus === 'pending' && 
                <Spinner animation="border" role="status" variant="light">
                     <span className="sr-only">Loading...</span>
                </Spinner> }
            <div className="ticket-text">"{ticketText}"</div>
            {ticketStatus === 'in-progress' && 
                <div className="slide-in">
                    <div>Connect with {name} at {email}.</div>
                    <div>Once your issue is resolved, click resolved below</div>
                    <button variant="dark" onClick={resolveIssue}>Resolved!</button>
                </div>}
        </div>

    )
}

export default Ticket

