import React, {useEffect, useState} from 'react'
import styled, {keyframes} from 'styled-components'
import Button from 'react-bootstrap/Button'
import {Container, Col, Row, Form, OverlayTrigger, Tooltip} from 'react-bootstrap'
import Ticket from './ticket.js'

const HelpDesk = props => {

    const colors = ['#F7CAC9', '#92A8D1', '#88B04B', '#EFC050', '#F7CAC9', '#92A8D1', '#88B04B', '#EFC050']
    const [pos, setPos] = useState(0)
    
    //helpers array will be modified as a Queue to ensure cycling through available help desk employees (ie, the same person isn't picking up all of the tickets. once someone resolves a ticket, they are moved to the end of the line)
    const [showForm, setShowForm] = useState(false)
    const [helpers, setHelpers] = useState([{name: 'Jane Doe', busy: false, email: "jane@helpdesk.dev"}, {name: 'Lea Overend', busy: false, email: "lea@helpdesk.dev"}, {name: 'John Smith', busy: false, email: "john@helpdesk.dev"}, {name: 'Jim Norm', busy: true, email: "jim@heldesk.dev"}, {name: 'Ben Rasa', busy: true, email: ""}] )
    const [formText, setFormText] = useState('')
    
    //current ticket
    const [ticketStatus, setTicketStatus] = useState('none')
    const [ticketText, setTicketText] = useState('');
    
    //current helper
    const [assignedPos, setAssignedPos] = useState(0);
    
    //ticket queue
    const [queue, addToQueue] = useState([]);
    
    const date = new Date();

    useEffect(() => {
        const interval = setInterval(() => {
            setPos(pos => pos + 1);
          }, 60000);
          return () => clearInterval(interval);
      }, []);

    const showFormFunc = () => {
        setShowForm(!showForm);
    }

    const onFormChange = event => {
        setFormText(event.target.value)
    }

    const findIndexOfHelper = () => {
        let count = 0;
        helpers.forEach((i)=> {
            if(!i.busy){
                console.log("count", count);
                setAssignedPos(count);
                count++; 
            }
        })
      return count-1;
    } 

    const updateList = (val) => {
      let x = findIndexOfHelper();
      let arr = [];
      for(let i=0; i<helpers.length; i++){
          if(x===i){
            arr.push({name: helpers[i].name, busy: val, email: helpers[i].email})
          } else {
            arr.push(helpers[i])
          }
      }
      setHelpers(arr);
    }
 
    const submitTicket = () => {
        setShowForm(false);
        setTicketText(formText);
        setTicketStatus('pending');
        findIndexOfHelper();
        // addToQueue([...queue, {text: ticketText, assignedTo: helpers[assignedPos].name, status: ticketStatus}]);
       console.log("queue", queue)
        setTimeout(()=> {
            setTicketStatus('in-progress');
            updateList(true);
            console.log("list", helpers)
        }, 5000)
    }

    //Use unshift for a first in, first out data structure for all available IT professionals, to ensure even work between them! 
    const updateListAfterResolved = () => {
        let arr = [];
        for(let i=0; i<helpers.length; i++){
            if(assignedPos===i){
              arr.unshift({name: helpers[i].name, busy: false, email: helpers[i].email})
            } else {
              arr.push(helpers[i])
            }
        }
        setHelpers(arr);
    }

    const resolveIssue = () => {
        updateListAfterResolved();
        setTicketStatus('none');
        console.log("list", helpers)
    }

    const renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Available IT staff in white, busy IT staff in grey. Submit a ticket, wait for one of them to pick it up. Don't forget to mark as resolved so they can be re-added to the queue.
        </Tooltip>
    );
 
    const renderTooltip2 = (props) => (
        <Tooltip id="button-tooltip" {...props}>
          Available staff are assigned and then re added in the form of a queue, so they receive equal amounts of tickets. 
        </Tooltip>
    );


    return (
        <MyContainer dateColor={colors[pos]}>
            <Container>
                <Row>
                    <Col sm> 
                        <div className="left">
                            <div className="doug">{date.toLocaleDateString()}</div>
                            <div>{date.toLocaleTimeString()}</div>
                            <OverlayTrigger
                                placement="bottom"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip}
                                >
                                <div className="hover">Use the Help Desk...</div>
                            </OverlayTrigger>
                            <div className="info">
                                <p>Beta Tester</p>
                                <p>Monsters Inc.</p>
                                <p>Employee ID: 11235811</p>
                                <p>beta@tester.dev</p>
                            </div>
                        </div>
                    </Col>
                    <Col className="middle col-size col" sm>
                            <OverlayTrigger
                                placement="right"
                                delay={{ show: 250, hide: 400 }}
                                overlay={renderTooltip2}
                                >
                                <Top><span className="hover">Help Desk Staff on Deck</span></Top>
                            </OverlayTrigger>
                        {/*connect to state, map helpers here*/}
                        { helpers.map((item) => {
                                if(!item.busy){
                                    return  <Button variant="light">{item.name}</Button>
                                } else {
                                    return  <Button variant="dark">{item.name}</Button>
                                }
                        } )
                       }
                    </Col>
                    <Col className="col" sm>
                        <Top>Submit a ticket</Top> 
                        <Button variant="dark" onClick={showFormFunc}>New Ticket</Button>
                        {showForm ? (<Form className="form submit-form">
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label className="issue">What is your issue?</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={onFormChange}/>
                            </Form.Group>
                            {/* <Button variant="dark" handleSubmit={submitTicket}>+</Button> */}
                            <Button variant="dark" onClick={submitTicket}>Submit Ticket</Button> 
                         </Form>) : (<div></div>)}
                        {(ticketStatus === 'pending' || ticketStatus === 'in-progress') ? 
                            //ONE TICKET
                            // (queue.map(item => 
                                <Ticket ticketStatus={ticketStatus} name={helpers[assignedPos].name} email={helpers[assignedPos].email} ticketText={ticketText} resolveIssue={resolveIssue}/>
                            // )
                            : (<div></div>)}
                    </Col>
                </Row>
            </Container>
        </MyContainer>
    )
}

export default HelpDesk

const slide = keyframes`
from {
    margin-top: 60px;
    opacity: 0;
  }
  to {
    margin-top: 30px;
    opacity: 1;
  }
`

const MyContainer = styled.div`
    width: 100%;
    overflow: hidden;
    margin: 0 auto;
    background-color: black;
    padding: 20px;
    color: #43474c;

    .col {
        text-align: center;
    }

    .left {
        text-align: left;
        position: relative;
        height: 90vh;
        p {
            margin-top: -10px;
        }
    }
    
    button {
        width: 90%;
        margin-top: 5px;
    }

    .info{
        position: absolute;
        bottom: 50px;
    }

    .row {
        margin-top: 25px;
    }

    .doug {
        color: ${props => props.dateColor};
        transition: 3s;
        font-size: 30px;
    }

    .box {
        margin: 30px 0px;
        padding: 6px;
        border-radius: 1.5px;
        animation-name: ${slide};
        animation-duration: 1.5s;
      
    }
    .issue {
        margin-top: 5px;
    }

    .ticket-text {
        font-size: 10px;
        padding: 5px 0px;
    }

    .in-progress {
        background-color: #88B04B;
    }

    .pending {
        background-color: #fddb3a;

    }

    .slide-in {
        width: 100%;
        background-color: #b8e86f;
        margin: 0px;
        padding: 5px;
        font-size: 12px;
        border-radius: 1.5px;
    }
    .hover {
        width: 90px;
        &:hover {
            color: 	#A8A8A8;
        }
    }

    @media (max-width: 679px) { 
        padding-bottom: 100px;
    }
`

const Top = styled.div`
    height: 80px;
    text-align: center;
  
`

