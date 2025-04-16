
const savedCartState = JSON.parse(localStorage.getItem('cartState'));

const initialState = savedCartState || {
  cartItems: [],
  cartCounter: 0,
  totalPrice: 0,
  deliverCharges: 50,
  taxes: 0,
  grandTotal: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

      if (existIndex !== -1) {
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === existIndex) {
            return {
              ...item,
              quantity: item.quantity + 1,
              total_item_price: (item.quantity + 1) * item.price,
            };
          }
          return item;
        });

        const updatedState = {
          ...state,
          cartItems: updatedCartItems,
          cartCounter: state.cartCounter + 1,
          totalPrice: state.totalPrice + action.payload.price,
          taxes: (state.totalPrice + action.payload.price) * 0.18,
          grandTotal: state.totalPrice + state.taxes + action.payload.price,
        };

        localStorage.setItem('cartState', JSON.stringify(updatedState));
        return updatedState;
      } else {
        const updatedState = {
          ...state,
          cartItems: [
            ...state.cartItems,
            { ...action.payload, quantity: 1, total_item_price: action.payload.price },
          ],
          cartCounter: state.cartCounter + 1,
          totalPrice: state.totalPrice + action.payload.price,
          taxes: (state.totalPrice + action.payload.price) * 0.18,
          grandTotal: state.totalPrice + state.taxes + action.payload.price,
        };

        localStorage.setItem('cartState', JSON.stringify(updatedState));
        return updatedState;
      }
    }


    default:
      return state;
  

  case 'INCREMENT_CART_COUNTER':{
    const updatedCartItems = state.cartItems.map(item => {
        if (item.id === action.payload) {
            const newQty = item.quantity + 1;
            return {
                ...item,
                quantity: newQty,
                total_item_price: newQty * item.price
            };
        }
        return item;
    });
    const newTotalPrice = updatedCartItems.reduce((acc, item) => acc + item.total_item_price, 0);
    const newTaxes = newTotalPrice * 0.18;
    const newGrandTotal = newTotalPrice + newTaxes + state.deliverCharges;

    return {
        ...state,
        cartItems: updatedCartItems,
        totalPrice: newTotalPrice,
        taxes: newTaxes,
        grandTotal: newGrandTotal,
    };
}

        case 'DECREMENT_CART_COUNTER': {
            const updatedCartItems = state.cartItems.map(item => {
              if (item.id === action.payload && item.quantity > 1) {
                const newQty = item.quantity - 1;
                return {
                  ...item,
                  quantity: newQty,
                  total_item_price: newQty * item.price
                };
              }
              return item;
            });
  
            const newTotalPrice = updatedCartItems.reduce((acc, item) => acc + item.total_item_price, 0);
            const newTaxes = newTotalPrice * 0.18;
            const newGrandTotal = newTotalPrice + newTaxes + state.deliverCharges;
  
            return {
              ...state,
              cartItems: updatedCartItems,
              totalPrice: newTotalPrice,
              taxes: newTaxes,
              grandTotal: newGrandTotal,
            };
          }
  
    }

};

export default cartReducer;
