import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Tab, Header,Card, Image, Grid, Button } from 'semantic-ui-react';
import PhotoUploadWidget from '../../app/common/photoUpload/PhotoUploadWidget';


import { Photo, Profile } from '../../app/models/profile';
import { useStore } from '../../app/stores/store';


interface Props {
	profile: Profile;
}

export default observer(function ProfilePhotos({ profile }: Props) {
	const { profileStore: { isCurrentUser, uploadPhoto, uploadingPhoto, loading, setMainPhoto, deletePhoto } } = useStore();
	const [enablePhoto, setEnablePhoto] = useState(false);
	const [target, setTarget] = useState('');

	function handlePhotoUpload(file: Blob) {
		uploadPhoto(file).then(() => setEnablePhoto(false));
	}

	function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
		setTarget(e.currentTarget.name);
		setMainPhoto(photo);
	}

	function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
		setTarget(e.currentTarget.name);
		deletePhoto(photo);
    }

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
						<PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploadingPhoto} />
					) : (
							<Card.Group itemsPerRow={5}>
								{profile.photos?.map(photo => (
									<Card key={photo.id}>
										<Image src={photo.url} />
										{isCurrentUser && (
											<Button.Group fluid widths={2}>
												<Button
													basic
													color='green'
													content='Main'
													name={'main' + photo.id}
													disabled={photo.isMainPhoto}
													loading={target === 'main' + photo.id && loading}
													onClick={e => handleSetMainPhoto(photo, e)}
												/>
												<Button basic color='red' icon='trash'
													loading={target === photo.id && loading}
													onClick={e => handleDeletePhoto(photo, e)}
													disabled={photo.isMainPhoto}
													name={photo.id}
												/>
													
												</Button.Group>
											)}
									</Card>
								))}

							</Card.Group>
							)}
				</Grid.Column>
			</Grid>
			
			
		</Tab.Pane>
		)
})