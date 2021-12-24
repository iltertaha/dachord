import React from 'react';
import {Button, Container, Menu } from 'semantic-ui-react';

interface Props {
    openForm: () => void;

}

export default function NavBar({openForm}:Props){
    return(
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="./assets/logo.png" alt="logo" style={{marginRight: "4px"}}/>
                    D'achord
                </Menu.Item>
                <Menu.Item name="Latest Music Events" />
                <Menu.Item>
                    <Button onClick={openForm} positive content="Create Music Event"/>
                </Menu.Item>
                <Menu.Item />

            </Container>
        </Menu>
    )
}