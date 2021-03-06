import { useEffect,useRef } from 'react';
import {Helmet} from "react-helmet";
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InsideHardCard from '../../components/InsideHardCard/InsideHardCard';
import PopularCard from '../../components/PopularCard/PopularCard';
import useApiPopular from '../../services/useApiPopular';

import './PizzaPage.css';

const PizzaPage = ({head}) => {
    const [data, loading, error, getRequest] = useApiData("pizza");
    const [popular, isLoading, isError, getPopular] = useApiPopular("pizza");
    const bodyRef = useRef(null);

    useEffect(() => {
        bodyRef.current.scrollIntoView();
        getRequest('http://localhost:3001/api/pizza');
        getPopular();
         // eslint-disable-next-line
    }, []);

    const cards = !data ? null : data.map((item) => {
        const image = item.img.traditional;
        const description = item.additionally.default.slice().join(',');
        const cost = item.price[25];

        return <ExternalCard key={item.id} 
                Inside={InsideHardCard}
                {...item}
                pageName="pizza"
                image={image} 
                description={description} 
                cost={`от ${cost}`} 
                btnName="Выбрать" />
    });

    const popularCards = !popular ? null : (
                                            popular.map(item => {
                                                return (
                                                    <PopularCard key={item.id} 
                                                        Inside={InsideHardCard} 
                                                        data={data} 
                                                        pageName="pizza" 
                                                        item={item} />
                                                );
                                            })
    );

    const errorMessage = error ? <ErrorMessage/> : null;
    const loadingData = loading ? <Skeleton/> : null;

    return (
        <>
            <Helmet>
                <meta
                    name="description"
                    content="Самая сочная пицца на всем диком западе и не только!"
                />
                <title>Пицца</title>
            </Helmet>

            <main ref={bodyRef} className="content-wrapper pizza-page">
                {!head ? null : (
                        <div className="pizza-page__popular">
                            <h1>Часто заказывают:</h1>
                            <div className="pizza-popular">
                                {popularCards}
                            </div>
                        </div>
                )}
                
                <section className="pizza-content">
                    {errorMessage}
                    {loadingData}
                    {cards}
                </section>
            </main>
        </>
    )
}

export default PizzaPage;