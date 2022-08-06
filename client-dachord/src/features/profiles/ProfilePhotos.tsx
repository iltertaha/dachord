import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Tab, Header,Card, Image, Grid, Button } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';


import { Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';


interface Props {
	profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
	const { profileStore: { isCurrentUser } } = useStore();
	const [enablePhoto, setEnablePhoto] = useState(false);

	return (
		<Tab.Pane>
			<Grid>
				<Grid.Column width={16}>
					<Header floated="left" icon='image' content='Photos' />
					{isCurrentUser && (
						<Button floated='right' basic content={enablePhoto ? 'Cancel' : 'Add new photo'}
							onClick={() => setEnablePhoto(!enablePhoto)} />
						)}
				</Grid.Column>
				<Grid.Column width={16}>
					{enablePhoto ? (
						<PhotoUploadWidget/>
					) : (
							<Card.Group itemsPerRow={5}>
								{profile.photos?.map(photo => (
									<Card key={photo.id}>
										<Image src={photo.url} />
									</Card>
								))}

							</Card.Group>
							)}
				</Grid.Column>
			</Grid>
			
			
		</Tab.Pane>
		)
})