import { Grid } from '@material-ui/core'
import React from 'react'

const PremiumAd = (props: any) => {
    return (
        <Grid className={`homepageBanner ${props.className}`}>
            <div className='homepageBannerContent'>
                <img src={props.photo} alt="sliderImg" />
            </div>
        </Grid>
    )
}

export default PremiumAd
