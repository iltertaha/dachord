import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';

export default observer(function HomePage() {
    const {userStore} = useStore();

    return (
        <Segment inverted textAlign="center" vertical className="intropage">
            <Container>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12, marginLeft: -50}} />
                    Dachord
                </Header>
                
                {userStore.isLoggedIn ? (
                    <>
                    <Header as='h2' inverted content="Welcome to D'achord!" />
                    <Button as={Link} to='/activities' size='huge' inverted> Go to D'achord</Button>
                    </>
                    
                ) : (
                    // if not logged in
                    <Button as={Link} to='/login' size='huge' inverted> Login</Button>
                    
                )}
                
                
            </Container>
        </Segment>
        )
})