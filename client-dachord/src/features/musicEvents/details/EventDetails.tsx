import React from 'react';
import {Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default function EventDetails() {

    const { activityStore } = useStore();
    const { selectedEvent: musicEvent } = activityStore;

    if (!musicEvent) return <LoadingComponent/>;

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
                    <Button basic color='grey' content='Cancel'></Button>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}