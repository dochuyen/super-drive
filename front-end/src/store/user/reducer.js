const initalState={
    username:''
}

const userNameReducer=(state = initalState, action)=>{
    switch(action.type){
        case "USER_NAME":
            return{
                ...state,
                username:action.payload
            }
            default:
                return state
    }
}
export default userNameReducer;