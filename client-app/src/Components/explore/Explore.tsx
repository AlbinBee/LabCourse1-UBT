import React, { Fragment, useEffect } from 'react'
import { Link, Route, Switch } from 'react-router-dom';
import { Button, Card, Container, Image, Label } from 'semantic-ui-react'
import agent from '../../app/api/agent';
import { IActivity } from '../../app/models/activity'

interface IProps {
    activities: IActivity[];
}

const Explore: React.FC<IProps> = ({ activities }) => {
    const viewActivity = (Id: string) => {
        console.log(Id);
    }

    return (
        <Container style={{ marginTop: '8em' }}>
            <Fragment>
                <Container style={{ marginTop: '7em' }} >
                    <Card.Group>
                        {activities.map((activity) => (
                            <Card>
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
                                        <Button floated='right' content='See More' color='blue' onClick={() => viewActivity(activity.id)} />
                                    </Link>
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
