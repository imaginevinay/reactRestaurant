import React, { Fragment, useContext, useState } from 'react'
import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem'
import Checkout from './Checkout';
import Loader from '../UI/Loader';
import Success from '../UI/Success';

function Cart(props) {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const ctx = useContext(CartContext);

    const totalAmt = `$ ${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;
    const cartItemAddHandler = (item) => {
        ctx.addItem({ ...item, amount: 1 });
    };
    const cartItemRemoveHandler = (id) => {
        ctx.removeItem(id)
    };

    const orderHandler = () => {
        setIsCheckout(prev => !prev);
    }

    const orderActions = <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onClickCart}>Close</button>
        {hasItems && <button className={classes['button']} onClick={orderHandler}>Order</button>}
    </div>

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(prev => !prev);
        await fetch('https://react-store-64e42-default-rtdb.firebaseio.com/orders.json', {
            method : 'POST',
            body : JSON.stringify({user : userData, items : ctx.items}),
        })
        setIsSubmitting(prev => !prev);
        setDidSubmit(prev => !prev);
        ctx.clearCart();
    }

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

    const cartModalContent = <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmt}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} handleCheckout={props.onClickCart}/>}
            {!isCheckout && orderActions}
    </Fragment>

    const isSubmittingContent = <div className={classes.submitting}>
        <Loader type="Watch" color=""/>
        <p>Sending order data ...</p>
    </div>

    const successContent = <div className={classes.submitting}>
        <Success />
        <p className={classes.orderPlacedText}>Order placed successfully!</p>
        <div className={`${classes.actions} ${classes.orderPlaceAction}`}>
            <button onClick={props.onClickCart} className={classes['button']}>Close</button>
        </div>
    </div>

    return (
        <Modal onCloseCart={props.onClickCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && !didSubmit && isSubmittingContent}
            {!isSubmitting && didSubmit && successContent}
        </Modal>
    )
}

export default Cart
