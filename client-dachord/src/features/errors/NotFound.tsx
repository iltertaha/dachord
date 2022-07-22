import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Icon, Segment, Image } from 'semantic-ui-react';

const notFoundGif = './assets/rickroll-rick.gif'

export default function NotFound() {
    return (
        <Segment placeholder>
            <Header icon>
                <Icon name='search' />
                Oh nooo! - We've looked everywhere and could not find the page.
                Or maybe someone rickrolled you :D
               
            </Header>
            <div><Image src={notFoundGif} size='medium' centered style={{"padding": "14px"}} /></div>
            
            <Segment.Inline>
                <Button as={Link} to="/musicEvents" primary>
                    Take me to home!
                </Button>
                </Segment.Inline>
        </Segment>
        )
}