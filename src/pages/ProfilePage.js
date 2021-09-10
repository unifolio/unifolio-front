import React, { useState, useEffect } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import qs from 'qs';

import Responsive from 'components/common/Responsive';
import ProfileHeader from 'components/Header/ProfileHeader';

import DefaultInfoContainer from 'containers/DefaultInfoContainer';
import AdditionalInfoContainer from 'containers/AdditionalInfoContainer';

import CreateUnion from 'composition/Profile/CreateUnion';
// import ManageAssociation from '../components/ManageAssociation';
import useFetchUserToken from "modules/hooks/useFetchUserToken";

const ProfilePage = ({ location }) => {
	const query = qs.parse(location.search, { ignoreQueryPrefix: true });
	
	const [status, setStatus] = useState(query.mode !== undefined ? query.mode : 'profile');
  const { user } = useFetchUserToken();

	// const mainSectionSelector = (current) => {
	// 	console.log('mainSectionSelector', current);
	// 	if (status !== current && current !== undefined) {
	// 		setStatus(current);
	// 	}
	// 	switch (current) {
	// 		case 'create-association':
	// 			return <CreateUnion />;
	// 		case 'profile':
	// 			console.log('profile not usable');
	// 			return <div style={{ width: '100%' }}> profile </div>;
	// 		default:
	// 			return <div style={{ width: '100%' }}> profile </div>;
	// 	}
	// };

	const onChangeHeaderStatus = (value) => {
		console.log('onChangeHeaderStatus', value);
		setStatus(value);
	};

	return (
		<>
			<ProfileHeader current={query.mode} status={status} submitChangeHeaderStatus={onChangeHeaderStatus} />
			
			<ProfilePageLayout className="ProfilePage">
				{status === 'profile' && (
					<>
						<DefaultInfoContainer user={user}/>
						<AdditionalInfoContainer user={user}/>
					</>
				)}
				{status !== 'profile' && (
					<ProfilePageMainSection>
						<CreateUnion />
					</ProfilePageMainSection>
				)}
			</ProfilePageLayout>
		</>
	);
};

const ProfilePageLayout = styled(Responsive)`
	height: calc(100vh - 8rem); /* 레거시 */
	max-width: 1010px;
  margin: auto;

	display: flex;
	flex-direction: column;
`;

const ProfilePageMainSection = styled.div`
	width: 100%;
	height: 100%;
	margin-top: 10rem;
	padding-right: 1rem;

	display: flex;
	flex-direction: column;
	section {
		margin-bottom: 3rem;
	}

	.column {
		display: flex;
		flex-direction: row;

		.row {
			display: flex;
			flex-direction: column;
		}
	}

	.row {
		display: flex;
		flex-direction: column;

		.column {
			display: flex;
			flex-direction: row;
		}
	}
`;


export default ProfilePage;
