import React, { useState } from 'react';
import { Container, Grid } from 'semantic-ui-react'
import './style/styles.css';
import sliderImg from '../assets/slider1.png';
import sliderArrowLeft from '../assets/Icons/sliderArrowLeft.svg';
import sliderArrowRight from '../assets/Icons/sliderArrowRight.svg';
import techCategoryImg from '../assets/categories/tech.png';
import designCategoryImg from '../assets/categories/design.png';
import financeCategoryImg from '../assets/categories/finance.png';
import eventsCategoryImg from '../assets/categories/events.png';
import noImg from '../assets/ads/noImg.png';
import { IEvent } from '../../app/models/event';
import Heart from '../assets/Icons/heart.svg';
import HeartFilled from '../assets/Icons/heart-filled.svg';
import { Chip } from '@material-ui/core';
import { ICategory } from '../../app/models/category';
import mainStates from '../../app/state/mainStates';
import { Link } from 'react-router-dom';

interface IProps {
    events: IEvent[];
    categories: ICategory[];
}

const Homepage: React.FC<IProps> = ({ events, categories }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const user = mainStates.user;

    return (
        <Container className='hompageContainer'>
            <Grid className='homepageSlider'>
                <div className='homepageSliderContent'>
                    <img src={sliderArrowLeft} alt="sliderArrow" className='homepageSliderArrow' />
                    <img src={sliderImg} alt="sliderImg" className='homepageSliderImg' />
                    <img src={sliderArrowRight} alt="sliderArrow" className='homepageSliderArrow' />
                </div>
            </Grid>
            <Grid className='homepageCategories'>
                <div className='homepageCategoriesTitle'>
                    <h2>Categories</h2>
                </div>
                <div className='homepageCategoriesImg'>
                    <img src={techCategoryImg} alt="categoryImg" className='categoryImg' />
                    <img src={designCategoryImg} alt="categoryImg" className='categoryImg' />
                    <img src={financeCategoryImg} alt="categoryImg" className='categoryImg' />
                    <img src={eventsCategoryImg} alt="categoryImg" className='categoryImg' />
                </div>
            </Grid>
            <Grid className='homepagePremiumAds'>
                <div className='homepagePremiumAdsTitle'>
                    <h2>Premium Ads</h2>
                </div>
                <div className='homepagePremiumAdsImg'>
                    {events.map((event, index) => (
                        index < 5 &&
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
                                    <span className='cardIconContent'>
                                        <img
                                            src={isFavorite ? Heart : HeartFilled}
                                            alt="FavoriteEvent"
                                            className='favoriteCardIcon'
                                            onClick={() => setIsFavorite(!isFavorite)}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Grid>
            <Grid className='homepageBanner'>
                <div className='homepageBannerContent'>
                    <img src={sliderImg} alt="sliderImg" className='homepageSliderImg' />
                </div>
            </Grid>
            {/* <Grid>
                <h1>Filter</h1>
                <h1>Filtered Events</h1>
            </Grid> */}
            {/* <Link to='/home' >
                <Button positive content='Edit Activities' />
            </Link>
            <span style={{ marginLeft: "20px", marginRight: "20px" }}>Or</span>
            <Link to='/explore' >
                <Button content='Explore Activities' color='blue' />
            </Link> */}
        </Container>
    );
}

export default Homepage;