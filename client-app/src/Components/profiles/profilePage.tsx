import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import agent from '../../app/api/agent'
import LoadingComponent from '../../app/layout/LoadingComponent'
import { IProfile } from '../../app/models/profile'
import { IUser } from '../../app/models/user'
import ProfileContent from './profileContent'
import ProfileHeader from './profileHeader'

const ProfilePage = () => {
    const { username }: { username: string } = useParams();
    const [user, setUser] = useState<IUser | null>(JSON.parse(sessionStorage.getItem('user')!));
    const [profile, setProfile] = useState<IProfile | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [isCurrentUser, setIsCurrentUser] = useState<boolean>();

    const loadProfile = async (username: string) => {
        try {
            const profile = await agent.Profiles.get(username);
            setProfile(profile);
            setLoadingProfile(false)
        } catch (error) {
            console.log(error);
        }
    }

    const checkCurrentUser = () => {
        if (user && profile) {
            if (user.username === profile.username) {
                setIsCurrentUser(true);
            } else {
                setIsCurrentUser(false);
            }
        }
    }

    useEffect(() => {
        loadProfile(username.toLowerCase());
        checkCurrentUser();
    }, [loadingProfile])

    if (loadingProfile) return <LoadingComponent content='Loading Profile...' />

    return (
        <Grid style={{ marginTop: '100px' }}>
            <Grid.Column width={16}>
                <ProfileHeader profile={profile!} />
                <ProfileContent profile={profile!} isCurrentUser={isCurrentUser!} user={user!} />
            </Grid.Column>
        </Grid>
    )
}
export default ProfilePage