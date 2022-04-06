import React from 'react';
import { NavLink } from 'react-router-dom';
import {Button, Container, Menu } from 'semantic-ui-react';




export default function NavBar() {

   

    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="./assets/logo.png" alt="logo" style={{marginRight: "4px"}}/>
                    D'achord
                </Menu.Item>
                <Menu.Item as={ NavLink} to='/musicEvents' name="Latest Music Events" />
                <Menu.Item as={ NavLink} to='/errors' name="Errors" />
                <Menu.Item>
                    <Button as={NavLink} to='/createEvent' positive content="Create Music Event" />
                </Menu.Item>
                <Menu.Item />

            </Container>
        </Menu>
    )
}