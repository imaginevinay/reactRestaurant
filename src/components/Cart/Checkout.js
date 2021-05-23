import React, {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length >= 5;

function Checkout(props) {
    const nameRef = useRef();
    const streetRef = useRef();
    const zipRef = useRef();
    const cityRef = useRef();

    const [formInputsValidity, setFormInputsValidity] = useState({
        name : true,
        street : true,
        city : true,
        zip : true
    });

    const confirmHandler = (event) => {
        event.preventDefault();

        const name = nameRef.current.value;
        const street = streetRef.current.value;
        const zip = zipRef.current.value;
        const city = cityRef.current.value;

        const nameIsValid = !isEmpty(name);
        const streetIsValid = !isEmpty(street);
        const cityIsValid = !isEmpty(city);
        const zipIsValid = isFiveChars(zip);

        setFormInputsValidity({
            name : nameIsValid,
            street : streetIsValid,
            city : cityIsValid,
            zip : zipIsValid
        })

        const formIsValid = nameIsValid && streetIsValid && cityIsValid && zipIsValid;
        if(!formIsValid) {
            //gve error feedback;
            return;
        }

        props.onConfirm({
            name : name,
            street : street,
            zip : zip,
            city : city
        })
    }

    const nameClasses = `${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`
    const streetClasses = `${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`
    const cityClasses = `${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`
    const zipClasses = `${classes.control} ${formInputsValidity.zip ? '' : classes.invalid}`


    return (
        <form onSubmit={confirmHandler} className={classes.form}>
            <div className={nameClasses}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" ref={nameRef}/>
                {!formInputsValidity.name && <p>Please enter a valid name</p>}
            </div>
            <div className={streetClasses}>
                <label htmlFor="street">Street</label>
                <input type="text" id="street" ref={streetRef}/>
                {!formInputsValidity.street && <p>Please enter a valid street</p>}
            </div>
            <div className={zipClasses}>
                <label htmlFor="zip">Zip Code</label>
                <input type="text" id="zip" ref={zipRef}/>
                {!formInputsValidity.zip && <p>Please enter a valid zip code</p>}
            </div>
            <div className={cityClasses}>
                <label htmlFor="city">City</label>
                <input type="text" id="city" ref={cityRef}/>
                {!formInputsValidity.city && <p>Please enter a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type="button" onClick={props.handleCheckout}>Cancel</button>
                <button type="submit" className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout
