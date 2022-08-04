import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Button, Container, Menu, Image, Dropdown } from 'semantic-ui-react';
import { useStore } from '../stores/store';

export default observer(function NavBar() {
    const { userStore: { user, logout, isLoggedIn } } = useStore();
    const x = user?.username;
    console.log("navbar " + x);
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} exact to='/' header>
                    <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
                    Dachord
                </Menu.Item>
                {isLoggedIn &&
                    <>
                    <Menu.Item as={NavLink} to='/musicEvents' name="Latest Music Events" />
                        <Menu.Item as={NavLink} to='/errors' name='Errors' />
                        <Menu.Item>
                        <Button as={NavLink} to='/createEvent' positive content="Create Music Event" />
                        </Menu.Item>
                        <Menu.Item position='right'>
                            <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
                            <Dropdown pointing='top left' text={user?.displayName}>
                                <Dropdown.Menu>
                                <Dropdown.Item as={Link} to={`/profiles/${user?.username}`}
                                        text='My Profile' icon='user' />
                                    <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                                </Dropdown.Menu>
                            </Dropdown>
                        </Menu.Item>
                    </>}

            </Container>
        </Menu>
    )
})