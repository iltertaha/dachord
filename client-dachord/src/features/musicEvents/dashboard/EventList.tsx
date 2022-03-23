import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import {Button, Header, Item, Label, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import EventListItem from './EventListItem';



export default observer(function EventList() {
    const { activityStore } = useStore();
    const { groupedActivities } = activityStore;



    return (
        <>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                        <Header sub color='teal'>
                            {group}
                    </Header>
                    <Segment>
                        <Item.Group divided>
                            {activities.map(m => (
                                <EventListItem key={m.id} event={m} />
                            ))}
                        </Item.Group>
                    </Segment>
                </Fragment>
                ))}
            </>
        )
})

