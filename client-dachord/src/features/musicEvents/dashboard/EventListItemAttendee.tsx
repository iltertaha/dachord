import React from 'react';
import { List, Image } from 'semantic-ui-react';

export default function EventListItemAttendee() {
    return (
        <List horizontal>
            <List.Item>
                <Image size='mini' circular src='assets/user.png' />
            </List.Item>
            <List.Item>
                <Image size='mini' circular src='assets/user.png' />
            </List.Item>
            <List.Item>
                <Image size='mini' circular src='assets/user.png' />
            </List.Item>
        </List>
        )
}