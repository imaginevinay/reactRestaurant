import React, {useContext, useEffect, useState} from 'react'
import classes from './HeaderCartButton.module.css';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context'

function HeaderCartButton(props) {
    const [btnHighlight, setBtnHighlight] = useState(false);
    const ctx = useContext(CartContext);
    const {items} = ctx;
    const cartItems = items.reduce((acc, item) => {
        return acc+item.amount;
    }, 0)

    const buttonClasses = `${classes.button} ${btnHighlight ? classes.bump: ''}`

    useEffect(() => {
        if(!items.length) return;
        setBtnHighlight(true);
        const timer = setTimeout(() => {setBtnHighlight(false)}, 300)
        return () => {
            clearTimeout(timer)
        }
    }, [items])

    return (
        <button className={buttonClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon /></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{cartItems}</span>
        </button>
    )
}

export default HeaderCartButton
