import React from 'react';
import { Card, CardHeader } from '@material-ui/core';
import { IProfile } from '../../app/models/profile';
import UserImg from '../assets/Icons/avatar.svg';
import './style/style.css'

interface IProps {
    profile: IProfile
}

const ProfileHeader: React.FC<IProps> = ({ profile }) => {
    return (
        <Card >
            <CardHeader
                className='cardHeaderProfile'
                avatar={
                    <img src={profile!.image || UserImg} alt="avatar" className='profileBioAvatar' />
                }
                title={profile!.displayName}
                subheader={profile!.bio}
            />
        </Card>
    );
};

export default ProfileHeader;
