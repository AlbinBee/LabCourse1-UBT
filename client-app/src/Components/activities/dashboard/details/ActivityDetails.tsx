import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card, Container, Image } from 'semantic-ui-react'
import { IActivity } from '../../../../app/models/activity'

interface IProps {
    activity: IActivity;
    setEditMode: (editMode: boolean) => void;
    setSelectedActivity: (activity: IActivity | null) => void;
}

const ActivityDetails: React.FC<IProps> = ({ activity, setEditMode, setSelectedActivity }) => {
    const host = activity.attendees.filter(x => x.isHost)[0];
    return (
        <Container>
            <Card fluid>
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{activity.title}</Card.Header>
                    <Card.Meta>
                        <span>{activity.date}</span>
                    </Card.Meta>
                    <Card.Description>
                        {activity.description}
                    </Card.Description>
                    {host === undefined || host === null
                        ? <span>No one is hosting</span>
                        : <span>Host:  <Link to={`/profile/${host.displayName}`}><strong>{host.displayName}</strong></Link><img className='hostImage' width="50" height="50" src={host.image} alt="" /></span>
                    }
                </Card.Content>
                <Card.Content extra>
                    <Button.Group widths={2}>
                        <Button onClick={() => setEditMode(true)} basic color='blue' content='Edit' />
                        <Button onClick={() => setSelectedActivity(null)} basic color='red' content='Cancel' />
                    </Button.Group>
                </Card.Content>
            </Card>
        </Container>
    )
}

export default ActivityDetails
