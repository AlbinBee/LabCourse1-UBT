import React, { useEffect, useState } from 'react';
import { Container, Grid } from 'semantic-ui-react'
import './style/styles.css';
import sliderImg1 from '../assets/slider1.png';
import sliderImg2 from '../assets/slider2.png';
import sliderArrowLeft from '../assets/Icons/sliderArrowLeft.svg';
import sliderArrowRight from '../assets/Icons/sliderArrowRight.svg';
import bookingsCategoryImg from '../assets/categories/bookings.png';
import designCategoryImg from '../assets/categories/design.png';
import eventsCategoryImg from '../assets/categories/events.png';
import financeCategoryImg from '../assets/categories/finance.png';
import jobsCategoryImg from '../assets/categories/jobs.png';
import moviesCategoryImg from '../assets/categories/movies.png';
import techCategoryImg from '../assets/categories/tech.png';
import noImg from '../assets/ads/noImg.png';
import { IEvent } from '../../app/models/event';
import Heart from '../assets/Icons/heart.svg';
import HeartFilled from '../assets/Icons/heart-filled.svg';
import { Chip } from '@material-ui/core';
import { ICategory } from '../../app/models/category';
import mainStates from '../../app/state/mainStates';
import { Link } from 'react-router-dom';
import PremiumAd from '../ads/premiumAd';

interface IProps {
    events: IEvent[];
    categories: ICategory[];
}

const Homepage: React.FC<IProps> = ({ events, categories }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [imgNo, setImgNo] = useState(0);

    const user = mainStates.user;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container className='hompageContainer'>
            <Grid className='homepageSlider'>
                <div className='homepageSliderContent'>
                    <img src={sliderArrowLeft} alt="sliderArrow" className='homepageSliderArrow' onClick={() => setImgNo(imgNo <= 0 ? 1 : imgNo - 1)} />
                    <img src={imgNo == 0 ? sliderImg1 : sliderImg2} alt="sliderImg" className='homepageSliderImg' />
                    <img src={sliderArrowRight} alt="sliderArrow" className='homepageSliderArrow' onClick={() => setImgNo(imgNo >= 1 ? 0 : imgNo + 1)} />
                </div>
            </Grid>
            <Grid className='homepageCategories'>
                <div className='homepageCategoriesTitle'>
                    <h2>Categories</h2>
                </div>
                <div className='homepageCategoriesImg'>
                    <Link to='/categories/bookings'><img src={bookingsCategoryImg} alt="categoryImg" className='categoryImg' /></Link>
                    <Link to='/categories/design'><img src={designCategoryImg} alt="categoryImg" className='categoryImg' /></Link>
                    <Link to='/categories/events'><img src={eventsCategoryImg} alt="categoryImg" className='categoryImg' /></Link>
                    <Link to='/categories/movies'><img src={moviesCategoryImg} alt="categoryImg" className='categoryImg' /></Link>
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
            <PremiumAd photo={sliderImg1} />
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