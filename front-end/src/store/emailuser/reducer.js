const initalState={
    email:''
}
const emailReducer=(state= initalState, action)=>{
    switch(action.type){
        case 'EMAIL_USER':
            return{
                ...state,
                email :action.payload
            }
            default :
            return state
    }
}
export default emailReducer;