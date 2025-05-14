import axios from "axios";

// ==== Action Creators ====

export const saveUserCart = () => async (dispatch, getState) => {
  const {
    cart: { cartItems },
    userLogin: { userInfo }
  } = getState();

  console.log("🛒 saveUserCart triggered", { userInfo, cartItems });

  if (!userInfo || userInfo.success === false) {
    console.warn("🚫 Aborting saveUserCart: user not logged in or login failed.");
    return;
  }

  const invalidItems = cartItems.filter(item => !(item.productId || item.id) || typeof item.qty !== 'number');
  if (invalidItems.length > 0) {
    console.warn('⚠️ Found invalid cart items, skipping:', invalidItems);
  }

  const transformedCart = cartItems
    .filter(item => (item.productId || item.id) && typeof item.qty === 'number')
    .map(item => ({
      ...item,
      productId: item.productId || item._id || item.id, 
      qty: Math.max(1, Number(item.qty)), // ensuring qty is a number >= 1
    }));

    console.log("📤 Sending to backend:", transformedCart);

  // Allow saving empty cart
  if (transformedCart.length === 0) {
    console.warn("⚠️ Cart is empty. Will save empty cart to backend.");
  }

  
  try {
    await axios.post(
      "http://localhost:7000/api/cart/save",
      { cartItems: transformedCart },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );

    console.log("✅ Cart saved:", transformedCart);
  } catch (error) {
    console.error("❌ Error saving cart to backend:", error);
  }
};

// Load the user's cart from the backend

export const loadUserCart = (userInfo) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get("http://localhost:7000/api/cart", {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    console.log("🛒 Loaded cart from DB:", data.cartItems);

    const cartItemsWithId = (data.cartItems || []).map(item => ({
      ...item,
      id: item.id || item._id,
    }));

    dispatch({ type: "LOAD_CART_FROM_DB", payload: cartItemsWithId });

    // ✅ Log Redux state after dispatch
    setTimeout(() => {
      const reduxCart = getState().cart.cartItems;
      console.log("✅ Redux cartItems after LOAD_CART_FROM_DB:", reduxCart);
    }, 300);

  } catch (error) {
    console.error("❌ Failed to load user cart:", error);
  }
};


// ==== Cart Manipulation Actions ====

export const addToCart = (item) => async (dispatch) => {
  dispatch({ type: 'ADD_TO_CART', payload: item });
  dispatch(saveUserCart());
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: 'REMOVE_FROM_CART', payload: id });

  const { cart } = getState();
  const { userLogin: { userInfo } } = getState();

  if (userInfo) {
    dispatch(saveUserCart(cart)); // Save updated cart to backend
  }
};


export const incrementCartCounter = (id) => async (dispatch) => {
  dispatch({ type: 'INCREMENT_CART_COUNTER', payload: id });
  dispatch(saveUserCart());
};

export const decrementCartCounter = (id) => async (dispatch) => {
  dispatch({ type: 'DECREMENT_CART_COUNTER', payload: id });
  dispatch(saveUserCart());
};

export const clearCart = () => async (dispatch, getState) => {
  const { userLogin: { userInfo } } = getState();

  if (userInfo) {
    try {
      await axios.post("/api/cart/clear", {}, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
    } catch (error) {
      console.error("Error clearing cart in the backend:", error);
    }
  }

  dispatch({ type: 'CLEAR_CART' });
};
