import { useState, useEffect } from "react";
import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {};


export default function Meals() {

    const { data: loadedMeals, isLoading, error } =
        useHttp('http://localhost:3000/meals', requestConfig, [])

    if (isLoading) {
        return (
            <p className="center">Fetching meals</p>
        );
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }

    // const [loadedMeals, setLoadedMeals] = useState([]);

    // useEffect(() => {
    //     async function fetchMeals() {
    //         try {
    //             const resposne = await fetch('http://localhost:3000/meals');


    //             const meals = await resposne.json();
    //             setLoadedMeals(meals);
    //         } catch (error) {
    //             console.log(error);
    //         }


    //     }

    //     fetchMeals();
    // }, []);


    return (
        <ul id="meals">
            {loadedMeals.map(meal => <MealItem key={meal.id} meal={meal} />)}
        </ul>
    );
}