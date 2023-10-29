import {createStore} from 'redux'
import { persistStore } from 'redux-persist';
import persistedAuthReducer from './user/persisted';

const store=createStore(persistedAuthReducer);
const persistor = persistStore(store);
export {store, persistor};