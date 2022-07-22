import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();



    return (
        <Segment inverted textAlign="center" vertical className="intropage">
            <Container>
                <Header as='h1' inverted>
                    <Image size='massive' src='/assets/logo.png' alt='logo' style={{ marginBottom: 12, marginLeft: -50 }} />
                    Dachord
                </Header>
                {userStore.isLoggedIn ? (
                    <>
                        <Header as='h2' inverted content="Welcome to D'achord!" />
                        
                        <Button as={Link} to='/musicEvents' size='huge' inverted>
                            Go to D'achord!
                        </Button>
                        
                    </>
                    
                ) : (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm/>)} size='huge' inverted> Login</Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size='huge' inverted> Sign Up</Button>
                            </>
                         )
                    
                    }
                
                
            </Container>
        </Segment>
    )
})