import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import {Button, Grid } from 'semantic-ui-react';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { PagingParams } from '../../../app/models/pagination';
import { useStore } from '../../../app/stores/store';
import EventFilters from './EventFilters';
import EventList from './EventList';


export default observer( function EventDashboard() {

    const { activityStore } = useStore();
    const { loadActivities, musicEventsRegistry, setPagingParams, pagination } = activityStore;
    const [loadingNext, setLoadingNext] = useState(false);
    



    function handleGetNext() {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadActivities().then(() => setLoadingNext(false));
    }


    // destructure only activityStore from the whole store

    useEffect(() => {
        if (musicEventsRegistry.size <= 1) {
            activityStore.loadActivities();
        } 
        // todo (will be tested)
        // loading icon appears during second add operation
        // setSubmitting(false);

        // notice empty dependency [] to avoid endless loop
        // runs only one time

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [musicEventsRegistry.size, loadActivities])






    if (activityStore.loadingInitial) return <LoadingComponent content='Loading Dachord App' />


    return(
        <Grid>
            <Grid.Column width="10">
                <EventList />
                <Button
                    floated='right'
                    content='Load more events'
                    positive
                    onClick={handleGetNext}
                    loading={loadingNext}
                    disabled={pagination?.totalItems == pagination?.currentPage}
                />
            </Grid.Column>
            <Grid.Column width="6">
               <EventFilters/>
            </Grid.Column>
        </Grid>


    )
})