import React, {useReducer} from 'react';
import CartContext from './cart-context';

const defaultCartState = {
    items : [],
    totalAmount : 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        
        const updatedTotalAmt = state.totalAmount + (action.item.price * action.item.amount);
        console.log('initial >>', state.totalAmount)
        console.log('adding to initial', (action.item.price * action.item.amount))
        console.log('final >>>>', updatedTotalAmt)
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;
        if(existingCartItem) {
            const UPDATED_ITEM = {
                ...existingCartItem,
                amount : existingCartItem.amount + action.item.amount
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = UPDATED_ITEM

        } else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items : updatedItems,
            totalAmount : updatedTotalAmt
        }
    }
    
    if(action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmt = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.amount === 1) {
            // remove whole item
            updatedItems = state.items.filter( item => item.id !== action.id );
        } else {
            // decrease the amount only
            const  updatedItem = {...existingCartItem, amount : existingCartItem.amount - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items : updatedItems,
            totalAmount : updatedTotalAmt
        }
    }

    if(action.type === 'CLEAR') {
        return defaultCartState;
    }

    return defaultCartState;
}

const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemHandler = item => {
        dispatchCartAction({type : 'ADD', item: item})
    }

    const removeItemHandler = id => {
        dispatchCartAction({type : 'REMOVE', id: id})
    }

    const clearCartHandler = () => {
        dispatchCartAction({type : 'CLEAR'})
    }

    const cartContext = {
        items : cartState.items,
        totalAmount : cartState.totalAmount,
        addItem : addItemHandler,
        removeItem : removeItemHandler,
        clearCart : clearCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}


export default CartProvider;