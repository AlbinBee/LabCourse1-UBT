import { Chip } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ICategory } from '../../app/models/category'
import { IEvent } from '../../app/models/event'
import noImg from '../assets/ads/noImg.png';
import EventCard from '../eventCard/eventCard'
import './styles.css';

interface IProps {
    categories: ICategory[];
    events: IEvent[];
}

const EventsPage: React.FC<IProps> = ({ categories, events }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='categoryPageContainer'>
            <div className='categoriesBGContainer'>
                <img src={`${process.env.PUBLIC_URL}/assets/categories-bg/events.png`} alt="categoriesBG" className='categoriesBG' />
            </div>
            <h2 className='categoryPageSubTitle'>All Posts: </h2>
            <div className='homepagePremiumAdsImg'>
                {events.map((event) => (
                    <EventCard event={event} categories={categories} />
                ))}
            </div>
        </div>
    )
}

export default EventsPage
