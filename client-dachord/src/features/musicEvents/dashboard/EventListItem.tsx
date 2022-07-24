import { Link } from 'react-router-dom'
import { Button, Icon, Item, Label, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'
import { format } from 'date-fns';
import EventListItemAttendee from './EventListItemAttendee';

interface Props {
    event: Activity;

}

export default function EventListItem({ event }: Props) {
    return (
        <Segment.Group>
            <Segment>
                {event.isCancelled && 
                    <Label attached='top' color='red' content='Cancelled' style={{textAlign: 'center'}}/>
                }
                <Item.Group>
                    <Item>
                        <Item.Image style={{marginBottom:3 }} size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/musicEvents/${event.id}`}>
                                {event.title}
                            </Item.Header>
                            <Item.Description>
                                Event created by {event.host?.displayName}
                            </Item.Description>
                            {event.isHost && (
                                <Item.Description>
                                    <Label basic color='blue'>
                                        You are hosting this event.
                                    </Label>
                                </Item.Description>
                            )}
                            {event.isGoing && !event.isHost && (
                                <Item.Description>
                                    <Label basic color='olive'>
                                        You are going to this event.
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {format(event.date!, 'dd MMM yyyy h:mm aa')}
                <Icon name='marker' /> {event.venue}
            </Segment>
            <Segment secondary>
                <EventListItemAttendee attendees={event.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{event.description}</span>
                <Button as={Link} to={`/musicEvents/${event.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
            </Segment>
        </Segment.Group>
        )
}