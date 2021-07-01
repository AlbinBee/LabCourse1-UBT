import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { IProfile } from '../../app/models/profile';
import { IUser } from '../../app/models/user';
import ProfileBio from './profileBio';
import ProfilePhotos from './profilePhotos';

interface IProps {
    profile: IProfile,
    isCurrentUser: boolean,
    user: IUser
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
    },
    tabs: {
        borderRight: `1px solid #a2deff`,
    },
}));

const ProfileContent: React.FC<IProps> = ({ profile, isCurrentUser, user }) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                className={classes.tabs}
            >
                <Tab label="About" {...a11yProps(0)} />
                <Tab label="Photos" {...a11yProps(1)} />
                <Tab label="Events" {...a11yProps(2)} />
                <Tab label="Sales" {...a11yProps(3)} />
                {isCurrentUser &&
                    <Tab label="Settings & Privacy" {...a11yProps(4)} />
                }
            </Tabs>
            <TabPanel value={value} index={0}>
                <ProfileBio user={user} isCurrentUser={isCurrentUser} profile={profile} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ProfilePhotos profile={profile!} isCurrentUser={isCurrentUser} user={user} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Events
            </TabPanel>
            <TabPanel value={value} index={3}>
                Sales
            </TabPanel>
            <TabPanel value={value} index={4}>
                Settings & Privacy
            </TabPanel>
        </div>
    );
}
export default ProfileContent