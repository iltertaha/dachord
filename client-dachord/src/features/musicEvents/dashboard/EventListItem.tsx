import { Link } from 'react-router-dom'
import { Button, Icon, Item, Segment } from 'semantic-ui-react'
import { Activity } from '../../../app/models/activity'


interface Props {
    event: Activity;

}

export default function EventListItem({ event }: Props) {
    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`/musicEvents/${event.id}`}>
                                {event.title}
                            </Item.Header>
                            <Item.Description>
                                Event created by ilter
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <Icon name='clock' /> {event.date}
                <Icon name='marker' /> {event.venue}
            </Segment>
            <Segment secondary>
                Participants
                <Icon name='clock' /> {event.date}
                <Icon name='marker' /> {event.venue}
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