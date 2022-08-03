import React from "react";
import { Tab } from "semantic-ui-react";

export default function ProfileContent() {
    const pageSections = [
        { menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane> },
        { menuItem: 'Photos', render: () => <Tab.Pane>Photos Content</Tab.Pane> },
        { menuItem: 'Activities', render: () => <Tab.Pane>Activities Content</Tab.Pane> },
        { menuItem: 'Followers', render: () => <Tab.Pane>Followers Content</Tab.Pane> },
        { menuItem: 'Following', render: () => <Tab.Pane>Following Content</Tab.Pane> }
    ];

    return (
        <Tab
            menu={{ fluid: true, vertical: false }}
            menuPosition='left'
            panes={pageSections}
        />

        )
}