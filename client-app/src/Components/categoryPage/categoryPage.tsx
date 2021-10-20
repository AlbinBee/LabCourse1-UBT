import React, { useEffect } from 'react'
import { ICategory } from '../../app/models/category'
import { IEvent } from '../../app/models/event'
import EventCard from '../eventCard/eventCard'
import './styles.css';

interface IProps {
    category: ICategory;
    categories: ICategory[];
    events: IEvent[];
}

const CategoryPage: React.FC<IProps> = ({ category, categories, events }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='categoryPageContainer'>
            <div className='categoriesBGContainer'>
                <img src={`${process.env.PUBLIC_URL}/assets/categories-bg/${category.title}.png`} alt="categoriesBG" className='categoriesBG' />
            </div>
            <div className='categoryPageDescription'>
                <p>"{category.description}"</p>
            </div>
            <h2 className='categoryPageSubTitle'>{category.title} Posts: </h2>
            <div className='homepagePremiumAdsImg'>
                {events.map((event) => (
                    event.categoryId == category.id &&
                    <EventCard event={event} categories={categories} />
                ))}
            </div>
        </div>
    )
}

export default CategoryPage
