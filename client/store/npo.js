import axios from 'axios';


const GET_ALL_NPO = "GET_ALL_NPO";


export const getAllNpo = (allnpo) => ({ type: GET_ALL_NPO , allnpo})



export const fetchAllNpo = () => {
    return function thunk (dispatch) {
        axios.get('api/all')
        .then(res => res.data)
        .then(allnpo => {
            const action = getAllNpo(allnpo)
            dispatch(action)
        })
        .catch(err => console.error(err))
    }
}

export default function (state = [], action){
    switch(action.type){
        case GET_ALL_NPO:
         return action.allnpo
        default: 
        return state
    }
}