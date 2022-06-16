import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { Activity } from "../../../app/models/activity";

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    event: Activity
}

export default observer(function EventDetailedHeader({ event }: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/eventImages/${event.category.toLowerCase()}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={event.title}
                                    style={{ color: 'white' }}
                                />
                                <p>{event.date}</p>
                                <p>
                                    Hosted by <strong>ilter</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Music Event</Button>
                <Button>Cancel attendance</Button>
                <Button as={Link} to={`/manage/${event.id}`} color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})