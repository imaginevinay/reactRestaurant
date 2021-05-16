import React, {useContext} from 'react'
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem'
function Cart(props) {
    const ctx = useContext(CartContext);

    const totalAmt = `$ ${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;
    const cartItemAddHandler= (item) => {
        ctx.addItem({...item, amount: 1});
    };
    const cartItemRemoveHandler = (id) => {
        ctx.removeItem(id)
    };

    const cartItems = <ul className={classes['cart-items']}>
        {ctx.items.map(item =>
            <CartItem 
                key={item.id} 
                name={item.name} 
                amount={item.amount}
                price={item.price}
                onAdd={cartItemAddHandler.bind(null, item)}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
            />
        )}
    </ul>

    return (
        <Modal onCloseCart={props.onClickCart}>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmt}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClickCart}>Close</button>
                {hasItems && <button className={classes['button']}>Order</button>}
            </div>
        </Modal>
    )
}

export default Cart
