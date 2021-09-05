import { Chip } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ICategory } from '../../app/models/category'
import { IEvent } from '../../app/models/event'
import noImg from '../assets/ads/noImg.png';
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
                {events.map((event, index) => (
                    index < 5 && event.categoryId == category.id &&
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

export default CategoryPage
