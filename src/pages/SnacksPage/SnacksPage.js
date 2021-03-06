import { useEffect,useRef } from 'react';
import {Helmet} from "react-helmet";
import useApiData from '../../services/useApiData';
import ExternalCard from '../../components/ExternalCard/ExternalCard';
import Skeleton from '../../components/skeleton/Skeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import InsideCard from '../../components/InsideCard/InsideCard';
import PopularCard from '../../components/PopularCard/PopularCard';
import useApiPopular from '../../services/useApiPopular';

import './SnacksPage.css';


const SnacksPage = ({head}) => {
    const [data, loading, error, getRequest] = useApiData("snacks");
    const [popular, isLoading, isError, getPopular] = useApiPopular("snacks");
    const bodyRef = useRef(null);

    useEffect(() => {
        bodyRef.current.scrollIntoView();
        getRequest('http://localhost:3001/api/snacks');
        getPopular();
        // eslint-disable-next-line
    }, []);

    const cards = !data ? null : data.map((item) => {

        return <ExternalCard key={item.id} 
                Inside={InsideCard}
                pageName="snacks"
                {...item}
                weight={`${item.weight} грамм`}
                btnName="В корзину" />
    });

    const popularCards = !popular ? null : (
        popular.map(item => {
            return (
                <PopularCard key={item.id} 
                    Inside={InsideCard} 
                    data={data} 
                    pageName="snacks" 
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
                    content="Попробууйте наши самые лучшие закуски!"
                />
                <title>Закуски</title>
            </Helmet>
        
            <main ref={bodyRef} className="snacks-page content-wrapper">
                {!head ? null : (
                                    <div className="snacks-page__popular">
                                        <h1>Часто заказывают:</h1>
                                        <div className="snacks-popular">
                                            {popularCards}
                                        </div>
                                    </div>
                )}

                <section className="snacks-content">
                    {errorMessage}
                    {loadingData}
                    {cards}
                </section>
            </main>
        </>
    )
}

export default SnacksPage;