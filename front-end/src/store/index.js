import {createStore, combineReducers} from 'redux'
import userNameReducer from './user/reducer';
import emailReducer from './emailuser/reducer';
const reducer=combineReducers({
    userNameReducer,
    emailReducer
})
const store=createStore(reducer);
export default store;