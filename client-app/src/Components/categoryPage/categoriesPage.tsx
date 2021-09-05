import { Chip } from '@material-ui/core'
import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ICategory } from '../../app/models/category'
import { IEvent } from '../../app/models/event'
import noImg from '../assets/ads/noImg.png';
import './styles.css';

interface IProps {
    categories: ICategory[];
    events: IEvent[];
}

const CategoriesPage: React.FC<IProps> = ({ categories, events }) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='categoryPageContainer'>
            {categories.map((category) => (
                <Fragment>
                    <Link to={`/categories/${category.title}`}>
                        <div className='categoryPageTitle'>
                            <h1>Category: {category.title}</h1>
                            <p>{category.description}</p>
                        </div>
                    </Link>
                    <Link to={`/categories/${category.title}`}>
                        <div className='categoriesBGContainer'>
                            <img src={`${process.env.PUBLIC_URL}/assets/categories-bg/${category.title}.png`} alt="categoriesBG" className='categoriesBG' />
                        </div>
                    </Link>
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
                </Fragment>
            ))}

        </div>
    )
}

export default CategoriesPage
