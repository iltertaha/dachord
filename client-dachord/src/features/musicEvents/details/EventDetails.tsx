import React from 'react';
import {Button, Card, Icon, Image } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';

interface Props{
    musicEvent: Activity
    cancelSelectEvent: () => void;
}

export default function EventDetails({musicEvent,cancelSelectEvent}: Props){
    return(
        <Card fluid>
            <Image src={`/assets/eventImages/${musicEvent.category.toLowerCase()}.jpg`} wrapped ui={false} />
            <Card.Content>
                <Card.Header>{musicEvent.title}</Card.Header>
                <Card.Meta>
                    <span>{musicEvent.date}</span>
                </Card.Meta>
                <Card.Description>
                    {musicEvent.description}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button basic color='blue' content='Edit'></Button>
                    <Button onClick={cancelSelectEvent} basic color='grey' content='Cancel'></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}