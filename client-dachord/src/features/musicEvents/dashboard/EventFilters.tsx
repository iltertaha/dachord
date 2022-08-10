import React from 'react'
import { Header, Menu } from 'semantic-ui-react'
import Calendar from 'react-calendar'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../../app/stores/store'

export default observer(function EventFilters() {
    const { activityStore: { predicate, setPredicate } } = useStore();


    return (
        <>
            <Menu vertical size='large' style={{width:'100%',marginTop: 25}}>
                <Header icon='filter' attached color='teal' content='Filters' />
                <Menu.Item content='All Music Events' active={predicate.has('all')} onClick={() => setPredicate('all','true')} />
                <Menu.Item content='Going to the event' active={predicate.has('isGoing')} onClick={() => setPredicate('isGoing', 'true')} />
                <Menu.Item content='Hosting the event' active={predicate.has('isHost')} onClick={() => setPredicate('isHost', 'true')} />
            </Menu>
            <Header />
            <Calendar locale="en-GB" onChange={(date: Date) => setPredicate('startDate', date as Date)}
                value={predicate.get('startDate') || new Date()}            />
        </>
        )
})