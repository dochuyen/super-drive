import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authPersistConfig = {
  key: "auth",
  storage: AsyncStorage,
  whitelist: ["username", "email", "cart"], 
};

const authReducer = (
  state = { username: null, email: null, cart: null },
  action
) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload };
    case "CLEAR_AUTH_STATE":
      return { username: null, email: null, cart: null };
    default:
      return state;
  }
};
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export default persistedAuthReducer;
