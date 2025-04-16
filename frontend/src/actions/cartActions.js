export const addToCart = (item) =>({
    type :'ADD_TO_CART',
    payload: item
});


export const removeFromCart = (item) =>({
    type :'REMOVE_FROM_CART',
    payload: item
});


export const incrementCartCounter = (id) =>({
    type :'INCREMENT_CART_COUNTER',
    payload: id
});


export const decrementCartCounter = (id) =>({
    type :'DECREMENT_CART_COUNTER',
    payload: id
   
});




