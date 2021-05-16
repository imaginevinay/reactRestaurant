import React from 'react';
import classes from './Header.module.css';
import restaurantImg from '../../assets/restaurant.jpg';
import HeaderCartButton from './HeaderCartButton'

function Header(props) {
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>React Meals</h1>
                <HeaderCartButton onClick={props.onClickCart}/>
            </header>
            <div className={classes['main-image']}>
                <img src={restaurantImg} alt="restaurantImg" />
            </div>
        </React.Fragment>
    )
}

export default Header
