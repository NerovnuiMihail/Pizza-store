import {    
    DessertPage,
    DrinksPage,
    PizzaPage,
    SnacksPage
} from "../index";
import Slider from "../../components/Slider/Slider";

import './HomePage.css';

const HomePage = () => {
    return (
        <div className="home-page">
            <h1 className="home-page__titile">Самые популярные</h1>

            <Slider />
            
            <h2 className="home-page__titile">Пицца</h2>
            <PizzaPage/>

            <h2 className="home-page__titile">Закуски</h2>
            <SnacksPage/>

            <h2 className="home-page__titile">Десерты</h2>
            <DessertPage/>
            
            <h2 className="home-page__titile">Напитки</h2>
            <DrinksPage/>
        </div>
    )
}

export default HomePage;