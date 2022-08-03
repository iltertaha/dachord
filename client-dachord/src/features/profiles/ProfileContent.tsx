import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfilePhotos from "./ProfilePhotos";


interface Props {
    profile: Profile;
}

export default observer(function ProfileContent({profile} : Props) {
    const pageSections = [
        { menuItem: 'About', render: () => <Tab.Pane>About Content</Tab.Pane> },
        { menuItem: 'Photos', render: () => <ProfilePhotos profile={profile}/> },
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
})