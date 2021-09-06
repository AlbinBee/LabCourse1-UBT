import React, { useEffect, useState } from 'react'
import { IEvent } from '../../app/models/event'
import noImg from '../assets/ads/noImg.png';
import BackArrow from '../assets/Icons/arrow-back.svg';
import NextArrow from '../assets/Icons/arrow-next.svg';
import SideAd1 from '../assets/ads/sideAd-1.svg';
import SideAd2 from '../assets/ads/sideAd-2.svg';
import { MainButton } from '../buttons/mainButton';
import sliderImg from '../assets/slider1.png';
import sliderImg2 from '../assets/slider2.png';
import PremiumAd from '../ads/premiumAd';
import './styles.css';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import { Visibility } from '@material-ui/icons';

interface IProps {
    event: IEvent;
    events: IEvent[];
}

const EventPage: React.FC<IProps> = ({ event, events }) => {
    const [imgNo, setImgNo] = useState(0);
    const isLoggedIn = JSON.parse(sessionStorage.getItem('isLoggedIn')!);

    useEffect(() => {
        window.scrollTo(0, 0);
        try {
            agent.Events.addView(event.id, event);
            event.views = event.views;
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div className='eventPageContainer'>
            <div className='eventPageTitle'>
                <h1>{event.title}</h1>
            </div>
            <div className='eventPageDetails'>
                <div className='eventPageImg'>
                    <img src={BackArrow} alt="BackArrow" className='eventSliderArrow' onClick={() => setImgNo(imgNo <= 0 ? event.galleryImages!?.length - 1 : imgNo - 1)} />
                    <img src={event.galleryImages!?.length > 0 ? event.galleryImages![imgNo].url : noImg} alt="eventImg" className='eventPageMainImg' />
                    <img src={NextArrow} alt="NextArrow" className='eventSliderArrow' onClick={() => setImgNo(imgNo >= event.galleryImages!?.length - 1 ? 0 : imgNo + 1)} />
                </div>
                <div className='eventPageContent'>
                    <div><h2>{event.title}</h2></div>
                    <div className='eventPageDescription'><p>{event.description}</p></div>
                    <div className='eventPageDate'><h5>{event.dateOfEvent}</h5></div>
                    {isLoggedIn ?
                        <div className='eventPageButton'><MainButton title='Buy Ticket' /></div>
                        : <Link to='/login'><div className='eventPageButton'><MainButton title='LOG IN' /></div></Link>
                    }
                </div>
            </div>
            <div className='eventPagePremiumAdContainer'>
                <PremiumAd photo={sliderImg} className='eventPagePremiumAd' />
            </div>
            <div className='eventPageBottomContent'>
                <div className='eventPageContent'>
                    <div><h1>{event.title}</h1></div>
                    <div className='eventPageDescription'>
                        <p>{event.description}</p>
                        {event.extra1 && <p>-{event.extra1}</p>}
                        {event.extra2 && <p>-{event.extra2}</p>}
                        {event.extra3 && <p>-{event.extra3}</p>}
                        {event.extra4 && <p>-{event.extra4}</p>}
                    </div>
                    <div className='eventPageDate'><p>Available Tickets:&nbsp; <b>{event.availableTickets}</b></p></div>
                    <p>Location:&nbsp; <b>{event.city}</b></p>
                    <p>Date of Event:&nbsp; <b>{event.dateOfEvent}</b></p>
                    <p className='eventPageViews'><Visibility />&nbsp; <b>{event.views}</b></p>
                    {isLoggedIn &&
                        <p>Author:&nbsp;
                            <Link to={`/profile/${event.author.displayName}`}>
                                <b><span className='eventPageAuthor'>{event.author.displayName} </span></b>
                            </Link>
                        </p>
                    }
                    {isLoggedIn ?
                        <div className='eventPageButton'><MainButton title='Buy Ticket' /></div>
                        : <Link to='/login'><div className='eventPageButton'><MainButton title='LOG IN' /></div></Link>
                    }
                </div>
                <div className='eventPageSideAds'>
                    <img src={SideAd1} alt="SideAd" className='eventPageSideAd' />
                    <img src={SideAd2} alt="SideAd" className='eventPageSideAd' />
                    <img src={SideAd1} alt="SideAd" className='eventPageSideAd' />
                    <img src={SideAd2} alt="SideAd" className='eventPageSideAd' />
                </div>
            </div>
            <div className='eventPagePremiumAdContainer'>
                <PremiumAd photo={sliderImg2} className='eventPagePremiumAd' />
            </div>
        </div>
    )
}

export default EventPage
