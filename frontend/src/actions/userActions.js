import axios from "axios";
import { loadUserCart } from "./cartActions"; 
import { saveUserCart } from "./cartActions";


export const loginUser = (formData) => async (dispatch) => {
  try {
    const { data } = await axios.post("http://localhost:7000/login", formData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: "USER_LOGIN_SUCCESS", payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
    console.log("✅ userInfo saved to localStorage:", data);

    // Immediately load cart using this userInfo
    dispatch(loadUserCart(data));

    return { success: true };
  } catch (error) {
    console.error("Login error:", error);
    return { success: false, message: error.response?.data?.errors || "Login failed" };
  }
};

export const logout = () => async (dispatch, getState) => {
  const { cart: { cartItems }, userLogin: { userInfo } } = getState();

  // ✅ Save cart before clearing anything
  if (userInfo?.token && cartItems.length > 0) {
    await dispatch(saveUserCart());
  }

  // ✅ Now clear Redux and localStorage
  dispatch({ type: 'USER_LOGOUT' });
  dispatch({ type: 'CLEAR_CART' });

  localStorage.removeItem('userInfo');
  localStorage.removeItem('cartItems');
};
