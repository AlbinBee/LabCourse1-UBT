import { Chip } from '@material-ui/core';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { ICategory } from '../../app/models/category'
import { IEvent } from '../../app/models/event'
import noImg from '../assets/ads/noImg.png';
import Heart from '../assets/Icons/heart.svg';
import HeartFilled from '../assets/Icons/heart-filled.svg';
import { Visibility } from '@material-ui/icons';

interface IProps {
    event: IEvent;
    categories: ICategory[];
}

const EventCard: React.FC<IProps> = ({ event, categories }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn')!);

    return (
        <div className='homepagePremiumAdsContainer'>
            <Link to={`/events/${event.id}`}>
                <img src={event.galleryImages!?.length > 0 ? event.galleryImages![0].url : noImg} alt="premiumAdsImg" className='premiumAdsImg' />
            </Link>
            <div className='cardContent'>
                <Link to={`/events/${event.id}`}>
                    <h3 className='cardContentTitle'>{event.title}</h3>
                </Link>
                <div className='midCardContent'>
                    {[...categories.filter(a => a.id === event.categoryId)][0] != undefined
                        &&
                        <Link to={`/categories/${[...categories.filter(a => a.id === event.categoryId)][0].title}`} className='homeCategoryLink'>
                            <Chip color="primary" label={[...categories.filter(a => a.id === event.categoryId)][0].title} className='categoryChipStatus' />
                        </Link>
                    }
                    <p className='eventPageViews'><Visibility />&nbsp; <b>{event.views}</b></p>
                </div>
                <div className='cardContentBottom'>
                    <span className='cardDateContent'>{event.dateOfEvent}</span>
                    {isLoggedIn &&
                        <span className='cardIconContent'>
                            <img
                                src={isFavorite ? HeartFilled : Heart}
                                alt="FavoriteEvent"
                                className='favoriteCardIcon'
                                onClick={() => setIsFavorite(!isFavorite)}
                            />
                        </span>
                    }
                </div>
            </div>
        </div>
    )
}

export default EventCard
