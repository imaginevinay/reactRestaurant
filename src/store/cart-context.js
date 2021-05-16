import React from 'react';

const CartContext = React.createContext({
    items : [],
    totalAmount : 0,
    addItem : (item) => {}, //for updating context
    removeItem: (id) => {}  //for updating context
})



export default CartContext;