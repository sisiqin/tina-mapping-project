import axios from 'axios';


//action type
const GET_ALL_HISTORY = "GET_ALL_HISTORY";


// INITIAL STATE 
const history = [];

// action creators 
export const getAllHistory = (allHistory) => ({ type: GET_ALL_HISTORY , allHistory})



// thunk creator 

export const fetchAllHistory = () => {
    return function thunk (dispatch) {
        axios.get('api/history')
        .then(res => res.data)
        .then(history => {
            const action = getAllHistory(history)
            dispatch(action)
        })
        .catch(err => console.error(err))
    }
}




export default function (state = history, action){
    switch(action.type){
        case GET_ALL_HISTORY:
         return action.allHistory
        default: 
        return state
    }
}