import React, { useRef, useState } from 'react'
import classes from './MealItemForm.module.css';
import Input from '../../UI/Input'
function MealItemForm(props) {
    const [amtIsValid, setAmtIsValid] = useState(true)
    const amountInputRef = useRef();
    const submitHandler = event => {
        event.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        const enteredAmountNumber = +enteredAmount;
        if(!enteredAmount.trim().length || enteredAmountNumber < 1 || enteredAmountNumber > 5) {
            setAmtIsValid(false);
            return;
        }

        props.onAddToCart(enteredAmountNumber);

    }
    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount"
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button>+ Add</button>
            {!amtIsValid && <p>Please enter valid amount (1-5)</p>}
        </form>
    )
}

export default MealItemForm
