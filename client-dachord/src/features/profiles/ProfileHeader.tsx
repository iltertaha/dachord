import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic } from 'semantic-ui-react';
import { Profile } from '../../app/models/profile';
import FollowActionButton from './FollowActionButton';


interface Props {
    profile: Profile;
}

// need to make it observer even though we dont use store here
export default observer(function ProfileHeader({profile} : Props) {

    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.image || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='Followers' value={profile.followersCnt} />
                        <Statistic label='Following' value={profile.followingCnt} />
                    </Statistic.Group>
                    <Divider />
                    <FollowActionButton profile={profile}/>
                </Grid.Column>
            </Grid>
        </Segment>
    )
})