import React from 'react'
import { Header, Menu } from 'semantic-ui-react'
import Calendar from 'react-calendar'

export default function EventFilters() {
    return (
        <>
            <Menu vertical size='large' style={{width:'100%',marginTop: 25}}>
                <Header icon='filter' attached color='teal' content='Filters'/>
                <Menu.Item content='All Music Events' />
                <Menu.Item content='Going to the event' />
                <Menu.Item content='Hosting the event' />
            </Menu>
            <Header />
            <Calendar />
        </>
        )
}