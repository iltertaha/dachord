import React from 'react';
import {Button, Container, Menu } from 'semantic-ui-react';

export default function NavBar(){
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="./assets/logo.png" alt="logo" style={{marginRight: "4px"}}/>
                    D'achord
                </Menu.Item>
                <Menu.Item name="Latest Music Events" />
                <Menu.Item>
                    <Button positive content="Create Music Event"/>
                </Menu.Item>
                <Menu.Item />

            </Container>
        </Menu>
    )
}