const savedCartState = JSON.parse(localStorage.getItem('cartState'));

const initialState = savedCartState || {
  cartItems: [],
  cartCounter: 0,
  totalPrice: 0,
  taxes: 0,
  deliverCharges: 50,
  grandTotal: 0,
};

// Function to calculate total price, taxes, and grand total
const calculateTotals = (cartItems, deliverCharges) => {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.total_item_price, 0);
  const taxes = totalPrice * 0.18;
  const grandTotal = totalPrice + taxes + deliverCharges;

  return { totalPrice, taxes, grandTotal };
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_TO_CART': {
      const productId = action.payload.productId || action.payload._id || action.payload.id;

      if (!productId) {
        console.warn('Missing product ID in payload:', action.payload);
      }

      const existIndex = state.cartItems.findIndex(item => item.id === productId || item.productId === productId || item._id === productId);

      let updatedState;

      if (existIndex !== -1) {
        // If item already exists, update its quantity
        const updatedCartItems = state.cartItems.map((item, index) => {
          if (index === existIndex) {
            const newQty = item.qty + 1;
            return {
              ...item,
              qty: newQty,
              total_item_price: newQty * item.price,
            };
          }
          return item;
        });

        updatedState = {
          ...state,
          cartItems: updatedCartItems,
          cartCounter: state.cartCounter + 1,
        };
      } else {
        // Add new item to cart
        updatedState = {
          ...state,
          cartItems: [
            ...state.cartItems,
            {
              ...action.payload,
              id: productId, 
              qty: 1,
              total_item_price: action.payload.price,
            },
          ],
          cartCounter: state.cartCounter + 1,
        };
      }

      const { totalPrice, taxes, grandTotal } = calculateTotals(updatedState.cartItems, state.deliverCharges);

      updatedState = {
        ...updatedState,
        totalPrice,
        taxes,
        grandTotal,
      };

      localStorage.setItem('cartState', JSON.stringify(updatedState));
      return updatedState;
    }


    case 'INCREMENT_CART_COUNTER': {
      const updatedCartItems = state.cartItems.map(item => {
        if (item.id === action.payload) {
          const newQty = item.qty + 1; 
          return {
            ...item,
            qty: newQty, 
            total_item_price: newQty * item.price,
          };
        }
        return item;
      });

      const { totalPrice, taxes, grandTotal } = calculateTotals(updatedCartItems, state.deliverCharges);

      const updatedState = {
        ...state,
        cartItems: updatedCartItems,
        totalPrice,
        taxes,
        grandTotal,
      };

      localStorage.setItem('cartState', JSON.stringify(updatedState));
      return updatedState;
    }

    case 'DECREMENT_CART_COUNTER': {
      const updatedCartItems = state.cartItems.map(item => {
        if (item.id === action.payload && item.qty > 1) {
          const newQty = item.qty - 1;
          return {
            ...item,
            qty: newQty,
            total_item_price: newQty * item.price,
          };
        }
        return item;
      });

      const { totalPrice, taxes, grandTotal } = calculateTotals(updatedCartItems, state.deliverCharges);

      const updatedState = {
        ...state,
        cartItems: updatedCartItems,
        totalPrice,
        taxes,
        grandTotal,
      };

      localStorage.setItem('cartState', JSON.stringify(updatedState));
      return updatedState;
    }

    case 'LOAD_CART_FROM_DB': {
      const cartItems = action.payload;  // Loaded from the backend or localStorage
      const { totalPrice, taxes, grandTotal } = calculateTotals(cartItems, state.deliverCharges);
      const cartCounter = cartItems.reduce((acc, item) => acc + item.qty, 0);

      const updatedState = {
        ...state,
        cartItems,
        cartCounter,
        totalPrice,
        taxes,
        grandTotal,
      };

      localStorage.setItem('cartState', JSON.stringify(updatedState));  // Store the loaded state in localStorage
      return updatedState;
    }


    case 'REMOVE_FROM_CART': {
      const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload);

      const totalQty = updatedCartItems.reduce((sum, item) => sum + item.qty, 0);
      const totalPrice = updatedCartItems.reduce((sum, item) => sum + item.qty * item.price, 0);
      const deliveryCharges = totalPrice > 0 ? 40 : 0;
      const taxes = +(totalPrice * 0.18).toFixed(2);
      const grandTotal = totalPrice + deliveryCharges + taxes;

      return {
        ...state,
        cartItems: updatedCartItems,
        cartCounter: totalQty,
        totalPrice,
        deliverCharges: deliveryCharges,
        taxes,
        grandTotal
      };
    }

    case 'CLEAR_CART': {
      // Clear localStorage when cart is cleared
      localStorage.removeItem('cartState');
      return {
        ...state,
        cartItems: [],
        cartCounter: 0,
        totalPrice: 0,
        taxes: 0,
        deliverCharges: 50,
        grandTotal: 0,
      };
    }

    default:
      return state;
  }
};

export default cartReducer;
