import { useState, useEffect } from "react";
import MealItem from "./MealItem";


export default function Meals() {

    const [loadedMeals, setLoadedMeals] = useState([]);

    useEffect(() => {
        async function fetchMeals() {
            try {
                const resposne = await fetch('http://localhost:3000/meals');


                const meals = await resposne.json();
                setLoadedMeals(meals);
            } catch (error) {
                console.log(error);
            }


        }

        fetchMeals();
    }, []);


    return (
        <ul id="meals">
            {loadedMeals.map(meal => <MealItem key={meal.id} meal={meal} />)}
        </ul>
    );
}