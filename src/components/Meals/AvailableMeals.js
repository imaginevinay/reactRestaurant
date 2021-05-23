import classes from './AvailableMeals.module.css';
import React, { useEffect, useState } from 'react';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import Loader from '../UI/Loader'

function AvailableMeals() {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch('https://react-store-64e42-default-rtdb.firebaseio.com/meals.json');
            if(!response.ok) {
                throw new Error('Something went wrong!');
            }
            const data = await response.json();
            const loadedMeals = [];
            for (let key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                })
            }
            setMeals(loadedMeals)
            setIsLoading(false);
        }

        fetchMeals().catch(error => {
            setIsLoading(false);
            setIsError(error.message);
        });

    }, [])
    const mealsList = meals.map(meal =>
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />)

    return (
        <section className={classes.meals}>
            {isLoading && <div className={classes.listNotFoundYet}><Loader /></div>}
            {!isLoading && isError && <p className={classes.listNotFoundYet}>{isError}</p>}
            {!isLoading && !isError && <Card><ul>{mealsList}</ul></Card>}            
        </section>
    )
}

export default AvailableMeals
