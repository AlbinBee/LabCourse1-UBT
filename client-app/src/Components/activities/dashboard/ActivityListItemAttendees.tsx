import React from 'react'
import { List, Image } from 'semantic-ui-react'
import { IAttendee } from '../../../app/models/activity';
import UserImg from '../../assets/Icons/avatar.svg';

interface IProps {
    attendees: IAttendee[];
}

export const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
    return (
        <List horizontal>
            {attendees.map((attendee) => (
                <List.Item key={attendee.username}>
                    <Image size='mini' circular src={attendee.image || UserImg} />
                    <span>{attendee.displayName}</span>
                </List.Item>
            ))}
        </List>
    )
}

export default ActivityListItemAttendees