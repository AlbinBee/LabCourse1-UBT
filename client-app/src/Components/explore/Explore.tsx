import React, { Fragment, useState } from 'react'
import { Link, Route } from 'react-router-dom';
import { Button, Card, Container, Image, Label } from 'semantic-ui-react'
import agent from '../../app/api/agent';
import { IActivity } from '../../app/models/activity'
import ActivityPage from '../ActivityPage';

interface IProps {
    activities: IActivity[];
}

const Explore: React.FC<IProps> = ({ activities }) => {
    const [activity, setActivity] = useState<IActivity | null>(null);

    const getSelectedActivity = (id: any) => {
        // agent.Activities.details(id).then(() => {
        //     const selectedActivity = activities.filter(a => a.id == id)[0];
        //     setActivity(selectedActivity);
        // });
    }


    return (
        <Container style={{ marginTop: '8em' }}>
            <Fragment>
                <Container style={{ marginTop: '7em' }} >
                    <Card.Group>
                        {activities.map((activity) => (
                            <Card key={activity.id}>
                                <Image src={`/assets/categoryImages/${activity.category}.jpg`} wrapped ui={false} label={{
                                    color: 'orange',
                                    content: 'PREMIUM',
                                    icon: 'star',
                                    ribbon: true,
                                }} />
                                <Card.Content>
                                    <Card.Header>{activity.title}</Card.Header>
                                    <Card.Meta>
                                        <span>{activity.date}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {activity.description}
                                    </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                    {activity.city}, {activity.venue}
                                    <br />
                                    <br />
                                    <Label basic content={activity.category} />
                                    <Link to={`/explore/${activity.id}`}>
                                        <Button floated='right' content='See More' color='blue' onClick={() => getSelectedActivity(activity.id)} />
                                    </Link>
                                    <Route path={`/explore/${activity.id}`} key={activity.id} render={() => (
                                        <Container style={{ marginTop: '8em' }}>
                                            <ActivityPage key={activity.id} activity={activity} />
                                        </Container>
                                    )} />
                                </Card.Content>
                            </Card>
                        ))}
                    </Card.Group>
                </Container>
            </Fragment>
        </Container>
    )
}

export default Explore
