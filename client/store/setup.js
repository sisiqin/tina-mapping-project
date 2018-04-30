import axios from 'axios';


//action type
const ADD_A_RECORD = "ADD_A_RECORD";
const EMPTY_FORM = 'EMPTY_FORM';
const UPDATE_A_RECORD = "UPDATE_A_RECORD";


// INITIAL STATE 
const newRecord = [];

// action creators 
export const addARecord = (record) => ({ type: ADD_A_RECORD , record})
export const emptyForm = () => ({type: EMPTY_FORM})


// thunk creator 

export const postARecord = (coffeeBean, grindLevel, coffeeBeanAmount,waterAmount, comment, love) => {
    return function thunk (dispatch) {
        axios.post('api/history', coffeeBean, grindLevel, coffeeBeanAmount,waterAmount, comment, love)
        .then( res => res.data )
        .then((newRecord) => dispatch(addARecord(newRecord)))
        .catch(err => console.error(err))
    }
}

export const updateARecord = (id, comment, love) => {
    return function thunk (dispatch) {
        axios.put(`api/history/${id}`, {comment : comment, love: love})
    }
}


export default function (state = newRecord, action){
    switch(action.type){
        case ADD_A_RECORD:
         return action.record
        
        case EMPTY_FORM:
        return [];
        

         default: 
        return state
    }
}