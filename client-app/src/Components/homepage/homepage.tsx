import React, { Fragment } from 'react';
import { Button, Container, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import './style/styles.css';
import sliderImg from '../assets/slider1.png';
import sliderArrowLeft from '../assets/Icons/sliderArrowLeft.svg';
import sliderArrowRight from '../assets/Icons/sliderArrowRight.svg';
import techCategoryImg from '../assets/categories/tech.png';
import designCategoryImg from '../assets/categories/design.png';
import financeCategoryImg from '../assets/categories/finance.png';
import eventsCategoryImg from '../assets/categories/events.png';
import premiumAdImg1 from '../assets/ads/premiumAd1.png';
import premiumAdImg2 from '../assets/ads/premiumAd2.png';
import premiumAdImg3 from '../assets/ads/premiumAd3.png';

const Homepage = () => {
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
                    <img src={techCategoryImg} alt="categoryImg" className='categoryImg'/>
                    <img src={designCategoryImg} alt="categoryImg" className='categoryImg'/>
                    <img src={financeCategoryImg} alt="categoryImg" className='categoryImg'/>
                    <img src={eventsCategoryImg} alt="categoryImg" className='categoryImg'/>
                </div>
            </Grid>
            <Grid className='homepagePremiumAds'>
                <div className='homepagePremiumAdsTitle'>
                    <h2>Premium Ads</h2>
                </div>
                <div className='homepagePremiumAdsImg'>
                    <img src={premiumAdImg1} alt="premiumAdsImg" className='premiumAdsImg'/>
                    <img src={premiumAdImg2} alt="premiumAdsImg" className='premiumAdsImg'/>
                    <img src={premiumAdImg3} alt="premiumAdsImg" className='premiumAdsImg'/>
                    <img src={premiumAdImg1} alt="premiumAdsImg" className='premiumAdsImg'/>
                    <img src={premiumAdImg2} alt="premiumAdsImg" className='premiumAdsImg'/>
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