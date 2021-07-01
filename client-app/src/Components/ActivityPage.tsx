import React from 'react';
import { IActivity } from '../app/models/activity';
import { Button, Container, Image, Label } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

interface IProps {
    activity: IActivity;
}

const ActivityPage: React.FC<IProps> = ({ activity }) => {
    return (
        <div>
            <Link to='/explore'>
                <Button floated='left' content='Back' color='blue' />
            </Link>
            <h1 style={{ textAlign: 'center' }}>{activity.title}</h1>
            <Container fluid textAlign='center'>
                <Image.Group size='big'>
                    <Image className='ActivityPageImg' src={`/assets/categoryImages/${activity.category}.jpg`} rounded wrapped size='big' label={{
                        color: 'orange',
                        content: 'PREMIUM',
                        icon: 'star',
                        ribbon: true,
                    }} />
                </Image.Group>
                <Label basic content={activity.category} />
                <h4>{activity.description}</h4>
                <h5>{activity.city}, {activity.venue}</h5>
                <h5>{activity.date}</h5>
            </Container>
        </div>
    )
}

export default ActivityPage
