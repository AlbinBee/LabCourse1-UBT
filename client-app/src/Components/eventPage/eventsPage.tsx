import { Chip } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ICategory } from '../../app/models/category'
import { IEvent } from '../../app/models/event'
import noImg from '../assets/ads/noImg.png';
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
                    <div className='homepagePremiumAdsContainer'>
                        <Link to={`/events/${event.id}`}>
                            <img src={event.galleryImages!?.length > 0 ? event.galleryImages![0].url : noImg} alt="premiumAdsImg" className='premiumAdsImg' />
                        </Link>
                        <div className='cardContent'>
                            <Link to={`/events/${event.id}`}>
                                <h3 className='cardContentTitle'>{event.title}</h3>
                            </Link>
                            {[...categories.filter(a => a.id === event.categoryId)][0] != undefined
                                &&
                                <Link to={`/categories/${[...categories.filter(a => a.id === event.categoryId)][0].title}`} className='homeCategoryLink'>
                                    <Chip color="primary" label={[...categories.filter(a => a.id === event.categoryId)][0].title} className='categoryChipStatus' />
                                </Link>
                            }
                            <div className='cardContentBottom'>
                                <span className='cardDateContent'>{event.dateOfEvent}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EventsPage
