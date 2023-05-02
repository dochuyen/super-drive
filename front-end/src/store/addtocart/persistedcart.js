const cartReducer = (state = { items: [] }, action) => {
    switch (action.type) {
      case 'ADD_ITEM':
        return { ...state, items: [...state.items, action.payload] };
      case 'REMOVE_ITEM':
        return { ...state, items: state.items.filter(item => item.id !== action.payload) };
      default:
        return state;
    }
  };
  
  const persistedCartReducer = persistReducer(cartPersistConfig, cartReducer);
  export default persistedCartReducer;
  