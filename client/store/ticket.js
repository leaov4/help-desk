import axios from 'axios'


const SET_TICKET = 'SET_TICKET'
const GET_FIRST_TICKET = 'GET_FIRST_TICKET'

export const setTicket = ticket => ({
    type: SET_TICKET,
    ticket
})

export const addTicketThunk = text => {
    return async dispatch => {
        try {
            const res = await axios.post(`/api/tickets/`, {
                text: text
            })
            dispatch(setTicket(res.data))
        } catch (error) {
            console.error(error)
        }
    }
}

const initialState = {}

function ticketsReducer(state = initialState, action) {

    switch(action.type){
        case SET_TICKET:
            return action.ticket
        default:
            return state
    }
}

export default ticketsReducer
