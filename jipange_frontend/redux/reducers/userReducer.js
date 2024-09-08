
let defaultState = {
    user: {},
    tasks: [],
    goals: [],

 
  };


const UserReducer = (state = defaultState, action) => {
    
 
    const { type, payload } = action;

    switch(type){
        case 'ON_USERSIGNON':
            return {
                ...state,
                user: payload,
            }
        case 'FETCH_GOALS':
            return {
                ...state,
                goals: payload,
            }
        case 'UPDATE_TASKS':
            return {
                ...state,
                tasks: payload,
            }
        
        
              

        default:
            return state;

    }



}


export default UserReducer