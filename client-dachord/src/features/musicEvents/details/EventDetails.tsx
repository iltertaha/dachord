import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {Button, Card, Image } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { useStore } from '../../../app/stores/store';



export default observer( function EventDetails() {

    const { activityStore } = useStore();
    const { selectedEvent: musicEvent, loadActivity, loadingInitial } = activityStore;
    const { id } = useParams<{id: string}>();


    useEffect(() => {
        if (id) loadActivity(id);

    },[id,loadActivity] );

    if (loadingInitial || !musicEvent) return <LoadingComponent />;

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
})